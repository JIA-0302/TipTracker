from datetime import datetime, timedelta
import math
import re
import os

# List of features and labels for ML model
SELECTED_FEATURES = ["month", "year", "day_of_week",
                     "week_of_month", "start_time", "end_time"]
SELECTED_LABELS = ['cash_tips', 'credit_card_tips']


SEARCH_DATE_FORMAT = 'yyyy-MM-dd'  # All dates should be formatted as such

# Interval to make prediction on
SHIFT_INTERVAL_MINUTES = int(os.environ.get('SHIFT_INTERVAL_MINUTES', '30'))

# Start and End time to make predictions on
SHIFT_START_TIME = int(os.environ.get('SHIFT_START_TIME', '10'))
SHIFT_END_TIME = int(os.environ.get('SHIFT_END_TIME', '23'))


def parse_search_date(search_date: str) -> datetime:
    """
    Check if the date is formatted as yyyy-MM-dd
    If it matches, parse it and convert it to datetime

    If it does not match, it throws an Exception
    """
    match = re.search('^\d{4}-\d{2}-\d{2}$', search_date)
    if match is None:
        raise ValueError(
            f'The search date should be formatted as {SEARCH_DATE_FORMAT}')

    return datetime.strptime(search_date, '%Y-%m-%d')


def parse_request_body(req_body: dict):
    """
    Parse the request body to retreive necessary data.

    Returns
    -------
    user_id : str
        Specified User Id
    parsed_dates : list[datetime]
        Datetime object based on provided dates


    """
    user_id = None
    search_dates = []

    if req_body.get('user_id') is None:
        raise ValueError('Please specify a valid user id')
    else:
        user_id = req_body.get('user_id')

    if req_body.get('dates') is None or not isinstance(req_body.get('dates'), list):
        raise ValueError('Please specify valid dates')
    else:
        search_dates = req_body.get('dates')
        if len(search_dates) == 0:
            raise ValueError("Please provide at least one date")

        parsed_search_dates = [parse_search_date(x) for x in search_dates]

    return user_id, parsed_search_dates


def get_week_of_month(dt: datetime):
    """
    Returns the week number for the month based on provided date

    Dates in first week -> 1 | Dates in second week -> 2 | ...
    """
    first_day = dt.replace(day=1)
    dom = dt.day
    adjusted_dom = dom + first_day.weekday()
    return int(math.ceil(adjusted_dom / 7.0))


def get_split_shift_time(start_time: datetime, end_time: datetime):
    """
    Split the time into equal intervals as specified by SHIFT_INTERVAL_MINUTES
    with the range of start and end time

    Returns
    -------
    shift_times: list[(start_time: datetime, end_time: datetime)]
    """
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


def get_data_points_for_day(shift_date: datetime):
    """
    Create input datapoints for ML model
    """

    # Retrieve common features among all data points
    month = shift_date.month
    year = shift_date.year
    day_of_week = shift_date.isoweekday()
    week_of_month = get_week_of_month(shift_date)

    datapoints = []

    # Initialize minimum and maximum shift time for the day
    start_time = datetime(year, month, shift_date.day, SHIFT_START_TIME)
    end_time = datetime(year, month, shift_date.day, SHIFT_END_TIME)

    # Retrieve all possible shift intervals for the day
    split_shift_time = get_split_shift_time(start_time, end_time)

    # Add datapoint for each interval
    for interval in split_shift_time:
        start = interval[0].strftime('%H%M')
        end = interval[1].strftime('%H%M')

        datapoints.append({
            "month": month,
            "year": year,
            "day_of_week": day_of_week,
            "week_of_month": week_of_month,
            "start_time": start,
            "end_time": end,
        })

    return datapoints


class DatasetError(Exception):
    """
    Custom Exception to identify errors in dataset
    """
    pass
