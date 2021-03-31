from datetime import datetime
import math
import re

SELECTED_FEATURES = ["month", "year", "day_of_week",
                     "week_of_month", "start_time", "end_time"]
SELECTED_LABELS = ['cash_tips', 'credit_card_tips']

SEARCH_DATE_FORMAT = 'yyyy-MM-dd'


def parse_search_date(search_date):
    match = re.search('^\d{4}-\d{2}-\d{2}$', search_date)
    if match is None:
        raise Exception(
            f'The search date should be formatted as {SEARCH_DATE_FORMAT}')

    return datetime.strptime(search_date, '%Y-%m-%d')


def parse_request_body(req_body: dict):
    user_id = None
    search_dates = []

    if req_body.get('user_id') is None:
        raise Exception('Please specify a valid user id')
    else:
        user_id = req_body.get('user_id')

    if req_body.get('search_dates') is None or not isinstance(req_body.get('search_dates'), list):
        raise Exception('Please specify valid search dates')
    else:
        search_dates = req_body.get('search_dates')
        if len(search_dates) == 0:
            raise Exception("Please provide at least one search date")

        parsed_search_dates = [parse_search_date(x) for x in search_dates]

    return user_id, parsed_search_dates


def week_of_month(dt: datetime):
    first_day = dt.replace(day=1)
    dom = dt.day
    adjusted_dom = dom + first_day.weekday()
    return int(math.ceil(adjusted_dom/7.0))


class DataPoint():
    def __init__(self, month, year, day_of_week, week_of_month, start_time, end_time):
        self.data = {
            "month": month,
            "year": year,
            "day_of_week": day_of_week,
            "week_of_month": week_of_month,
            "start_time": start_time,
            "end_time": end_time,
        }

    def get_datapoint(self):
        return [self.data[key] for key in SELECTED_FEATURES]
