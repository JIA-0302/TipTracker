from datetime import datetime
import math

SELECTED_FEATURES = ["month", "year", "day_of_week",
                     "week_of_month", "start_time", "end_time"]
SELECTED_LABELS = ['cash_tips', 'credit_card_tips']


def week_of_month(dt: datetime):
    first_day = dt.replace(day=1)
    dom = dt.day
    adjusted_dom = dom + first_day.weekday()
    return int(math.ceil(adjusted_dom/7.0))


class DataPoint():
    def __init__(self, month, year, day_of_week, week_of_month, start_time, end_time):
        self.data = {
            "month": month
            "year": year
            "day_of_week": day_of_week
            "week_of_month": week_of_month
            "start_time": start_time
            "end_time": end_time
        }

    def get_datapoint(self):
        return [self.data[key] for key in SELECTED_FEATURES]
