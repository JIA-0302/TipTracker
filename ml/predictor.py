import pandas as pd
import numpy as np
from datetime import datetime

from regressor import Regressor
from util import get_data_points_for_day


class Predictor:
    def __init__(self, user_id, search_dates):
        self.user_id = user_id
        self.search_dates = search_dates
        self._dataset = None

    def get_dataset(self):
        if self._dataset is None:
            # TODO - Retrieve dataset from database
            self._dataset = pd.read_csv('./shift_data.csv')

        return self._dataset

    def get_predicted_tips(self):
        dataset = self.get_dataset()
        model = Regressor(dataset=dataset)

        result = {}
        for date in self.search_dates:
            shift_date = date.strftime('%Y-%m-%d')
            datapoints = get_data_points_for_day(date)

            predicted_values = model.get_predicted_values(
                [x.get_input_value() for x in datapoints])

            current_predictions = []
            
            for i, dp in enumerate(datapoints):
                cash_tips, credit_card_tips = predicted_values[i]
                start_time = dp.data["start_time"]
                end_time = dp.data["end_time"]

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
