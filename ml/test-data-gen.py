import pandas as pd
import random
from datetime import datetime
from tqdm import tqdm
from util import get_week_of_month, get_split_shift_time

TIPS_RANGE = (30, 180)
WEEKEND_TIPS_RANGE = (100, 250)
HOURLY_WAGE = 10

START_HOUR_INTERVAL = (10, 18)
START_MINUTE = ['00', '30']
SHIFT_LENGTH_INTERVAL = (4, 6)

INDUSTRY = 'Restaurant'

# Generate shift data between the specified intervals


def get_shift_data(start_date, end_date):
    shift_days = pd.date_range(start=start_date, end=end_date)

    data = []

    if (len(shift_days) == 0):
        raise Exception(
            'Please specify a valid date range. End date cannot be less than start date')

    print('Generating shift data...')

    # Iterate over each day
    for day in tqdm(shift_days):

        # Get random shift start and end time
        shift_start_time = random.randint(*START_HOUR_INTERVAL)
        shift_end_time = shift_start_time + \
            random.randint(*SHIFT_LENGTH_INTERVAL)

        # If the end time is 24, change it to 23 since we do not want it to go to another day
        if shift_end_time == 24:
            shift_end_time = 23

        shift_date = str(day).split(' ')[0]
        parsed_shift_date = datetime.strptime(shift_date, '%Y-%m-%d')

        day_of_week = parsed_shift_date.isoweekday()

        # Generate slightly different data for weekend
        is_weekend = day_of_week >= 4

        start_time = f'{shift_date} {shift_start_time}:{random.choice(START_MINUTE)}:00'
        end_time = f'{shift_date} {shift_end_time}:{random.choice(START_MINUTE)}:00'

        shift_data = {
            'shift_date': shift_date,
            'start_time': start_time,
            'end_time': end_time,
            'hourly_wage': HOURLY_WAGE,
            'credit_card_tips': random.randint(*WEEKEND_TIPS_RANGE) if is_weekend else random.randint(*TIPS_RANGE),
            'cash_tips': random.randint(*WEEKEND_TIPS_RANGE) if is_weekend else random.randint(*TIPS_RANGE),
            'industry': INDUSTRY,
            'day_of_week': day_of_week,
            'month': parsed_shift_date.month,
            'day': parsed_shift_date.day,
            'year': parsed_shift_date.year,
            'week_of_month': get_week_of_month(parsed_shift_date)
        }

        data.append(shift_data)

    return data


def get_processed_shift_data(shift_data):
    parsed_start_time = datetime.strptime(
        shift_data['start_time'], '%Y-%m-%d %H:%M:%S')
    parsed_end_time = datetime.strptime(
        shift_data['end_time'], '%Y-%m-%d %H:%M:%S')

    split_shift_time = get_split_shift_time(parsed_start_time, parsed_end_time)

    total_intervals = len(split_shift_time)

    processed_data = []

    for shift in split_shift_time:
        new_shift_data = shift_data.copy()
        new_shift_data['credit_card_tips'] = int(
            shift_data['credit_card_tips'] / total_intervals)
        new_shift_data['cash_tips'] = int(
            shift_data['cash_tips'] / total_intervals)
        new_shift_data['start_time'] = shift[0].strftime('%H%M')
        new_shift_data['end_time'] = shift[1].strftime('%H%M')

        processed_data.append(new_shift_data)

    return processed_data


def generate_csv(filename, shift_data):
    headers = ['month', 'day', 'year', 'day_of_week', 'week_of_month', 'start_time', 'end_time', 'hourly_wage',
               'credit_card_tips', 'cash_tips', 'industry']

    print('Exporting data to csv...')
    with open(filename, 'w') as fp:
        fp.write(','.join(headers) + '\n')

        for current_shift_data in tqdm(shift_data):
            data = get_processed_shift_data(current_shift_data)

            for x in data:
                values = []
                for key in headers:
                    values.append(str(x[key]))
                fp.write(','.join(values) + '\n')


if __name__ == "__main__":
    import argparse

    # Default arguments
    start_date = '1/1/2020'
    end_date = '3/16/2021'
    file_name = 'shift_data.csv'

    try:
        parser = argparse.ArgumentParser(
            description='Generate test dataset for a user')
        parser.add_argument(
            '-s', '--start-date', help=f'First shift date in the dataset. Default: {start_date}')
        parser.add_argument(
            '-e', '--end-date', help=f'Last shift date in the dataset. Default: {end_date}')
        parser.add_argument(
            '-f', '--file-name', help=f'Name of the file to save the dataset. Default: {file_name}')
        args = parser.parse_args()

        if args.end_date:
            end_date = args.end_date
        if args.start_date:
            start_date = args.start_date
        if args.file_name:
            file_name = args.file_name

    except Exception as err:
        print(err)

    try:
        all_shift_data = get_shift_data(start_date, end_date)
        generate_csv(file_name, all_shift_data)
    except Exception as err:
        print('\033[31m' + 'Error generating data: ' + '\033[39m' + str(err))
