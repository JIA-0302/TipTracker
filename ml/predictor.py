import pandas as pd
import numpy as np
from datetime import datetime
import os

from regressor import Regressor
from database import FutureTrendsDatabase
from util import get_data_points_for_day, SELECTED_FEATURES, DatasetError


class Predictor:
    """
    A class used to find predicted tips for specified dates

    Attributes
    ----------
    user_id : int | str
        user id for the user to make predictions for
    search_dates : list[datetime]
        list of datetime representing days to make predictions for
    _dataset : pandas.DataFrame
        dataset for the ML model

    """

    def __init__(self, user_id, search_dates):
        """ Constructor for class

        Parameters
        ----------
        user_id : int | str
            user id for the user to make predictions for

        search_dates : list[datetime]
            list of datetime representing days to make predictions for

        Raises
        ------
        ValueError
            If user_id and search_dates are not specified
        """
        if user_id is None:
            raise ValueError("Please specify the user id")

        if search_dates is None or not isinstance(search_dates, list) or len(search_dates) == 0:
            raise ValueError(
                "Please specify the search days to make predictions for")

        self.user_id = user_id
        self.search_dates = search_dates
        self._dataset = None

    def validate_dataset(self):
        """
        Perform validation on the dataset.
        If there are certain exceptions, it throws DatabaseError
        """
        if len(self._dataset) <= 100:
            raise DatasetError(
                'We do not have sufficient data to make accurate predictions. Please continue entering shift data.')

    def get_dataset(self):
        """
        Retrieve the dataset for the based on the specified user_id
        """
        if self._dataset is None:
            # TODO - Retrieve dataset from database
            # self._dataset = pd.read_csv('./shift_data.csv')

            db = FutureTrendsDatabase()
            data = db.get_future_trends_by_filter({"user_id": self.user_id})

            self._dataset = pd.DataFrame(data)
            self.validate_dataset()

        return self._dataset

    def get_predicted_tips(self):
        """
        Based on the provided user id and search dates, get predicted tips
            - Initializes the ML model with the dataset and trains it
            - Process the input values for the ML model to make predictions on
            - Store the result for each day in dictionary
        """
        dataset = self.get_dataset()
        model = Regressor(dataset=dataset)

        weekday_count = dataset.day_of_week.value_counts().to_dict()

        # Make sure to convert all the week days value to string in key for consistency
        weekday_count = {str(k): v for k, v in weekday_count.items()}

        result = {}

        for date in self.search_dates:
            shift_date = date.strftime('%Y-%m-%d')

            # Check if we have at least 20 data points for the day of the week
            #   2 same day * 5 hour shift * 2 intervals in an hour = 20 datapoints
            # If there isn't sufficient datapoints, return set the predicted value to None
            if weekday_count.get(str(date.isoweekday()), 0) < 20:
                result[shift_date] = None
                continue

            datapoints = get_data_points_for_day(date)

            input_values = [
                [x[key] for key in SELECTED_FEATURES] for x in datapoints
            ]

            predicted_values = model.get_predicted_values(input_values)

            current_predictions = []

            for i, dp in enumerate(datapoints):
                cash_tips, credit_card_tips = predicted_values[i]
                start_time = dp["start_time"]
                end_time = dp["end_time"]

                current_predictions.append({
                    "start_time": f'{shift_date} {start_time[:2]}:{start_time[-2:]}:00',
                    "end_time": f'{shift_date} {end_time[:2]}:{end_time[-2:]}:00',
                    "cash_tips": cash_tips,
                    "credit_card_tips": credit_card_tips
                })

            result[shift_date] = current_predictions

        return {
            "result": result
        }
