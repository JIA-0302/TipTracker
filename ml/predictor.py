import pandas as pd
import numpy as np
from datetime import datetime

from regressor import Regressor
from util import get_data_points_for_day, SELECTED_FEATURES


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

    def get_dataset(self):
        """
        Retrieve the dataset for the based on the specified user_id
        """
        if self._dataset is None:
            # TODO - Retrieve dataset from database
            self._dataset = pd.read_csv('./shift_data.csv')

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

        result = {}

        for date in self.search_dates:
            shift_date = date.strftime('%Y-%m-%d')
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
