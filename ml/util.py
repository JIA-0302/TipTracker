from datetime import datetime, timedelta
from typing import List
import math
import re

SELECTED_FEATURES = ["month", "year", "day_of_week",
                     "week_of_month", "start_time", "end_time"]
SELECTED_LABELS = ['cash_tips', 'credit_card_tips']

SEARCH_DATE_FORMAT = 'yyyy-MM-dd'
SHIFT_INTERVAL_MINUTES = 30

SHIFT_START_TIME = 10
SHIFT_END_TIME = 23


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


def get_week_of_month(dt: datetime):
    first_day = dt.replace(day=1)
    dom = dt.day
    adjusted_dom = dom + first_day.weekday()
    return int(math.ceil(adjusted_dom/7.0))

# Given the start and end time, create equal intervals of 30 minutes


def get_split_shift_time(start_time: datetime, end_time: datetime):
    shift_times = []
    current_start_time = start_time
    current_end_time = start_time + timedelta(minutes=SHIFT_INTERVAL_MINUTES)

    # Do while loop since we want atleast one interval
    while True:
        shift_times.append((current_start_time, current_end_time))
        current_start_time = current_end_time
        current_end_time += timedelta(minutes=SHIFT_INTERVAL_MINUTES)
        if current_start_time >= end_time:
            break

    return shift_times


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

    def get_input_value(self):
        return [self.data[key] for key in SELECTED_FEATURES]


def get_data_points_for_day(shift_date: datetime) -> List[DataPoint]:
    month = shift_date.month
    year = shift_date.year
    day_of_week = shift_date.weekday()
    week_of_month = get_week_of_month(shift_date)

    datapoints = []

    start_time = datetime(year, month, shift_date.day, SHIFT_START_TIME)
    end_time = datetime(year, month, shift_date.day, SHIFT_END_TIME)

    split_shift_time = get_split_shift_time(start_time, end_time)
    for interval in split_shift_time:
        start = interval[0].strftime('%H%M')
        end = interval[1].strftime('%H%M')
        x = DataPoint(month, year, day_of_week, week_of_month, start, end)

        datapoints.append(x)

    return datapoints
