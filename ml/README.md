# Setup
1. For the project, use [python 3.8+](https://www.python.org/downloads/)

2. Setup virtual environment

    ```
    # If virtual environment has not be setup
    pip install virtualenv
    virtualenv env

    # To activate virtual environment
    \env\Scripts\activate
    ```

    This allows us manage and resolve dependenices easily

3. Install add dependencies:

    `pip install -r requirements.txt`

4. Start the server:

    `python index.py`


# Utils
## Generating Test Dataset
Use `test-data-gen.py` script to generate test dataset in `csv` format.

It accepts command line arguments to generate data as needed:
```
usage: test-data-gen.py [-h] [-s START_DATE] [-e END_DATE] [-f FILE_NAME]

Generate test dataset for a user

optional arguments:
  -h, --help            show this help message and exit
  -s START_DATE, --start-date START_DATE
                        First shift date in the dataset. Default: 1/1/2020
  -e END_DATE, --end-date END_DATE
                        Last shift date in the dataset. Default: 3/16/2021
  -f FILE_NAME, --file-name FILE_NAME
                        Name of the file to save the dataset. Default: shift_data.csv
```

An example usage would be:

`python test-data-gen.py -s 1/1/2021 -e 3/1/2021 -f test_dataset.csv`


## Playground
We need to continuously improve our ML model using different features, aggregating different data, different algorithms, and so much more.

We are using Google Colab as a playground. Use TipTracker account to access it [here](https://colab.research.google.com/drive/1yPToDJgMi_kc8ZymerYhxs888vZwFWlk).




# Usage
These API endpoints are protected and only authorized apps are allowed access based on the token issued.

The following API endpoints are available:

## `/predict_tips`

#### **POST** `/predict_tips`

This endpoint is used to predict tips for the user for the given days.
The body parameters to request the data are following:

| Parameter | Description | Required |
|-----------|-------------|----------|
| access_token | Access Token to authenticate and authorize app | Yes |
| user_id | `id` assigned to the user for whom we need to predict tips | Yes |
| dates | List of dates for which we need to predict tips. Each date should be formatted as `yyyy-MM-dd`. | Yes |

Example Request Body:

```
{
    "access_token": "i7pXBg7YhTCXvVKqXfTAl1obHuGCcmts",
    "user_id": 18,
    "dates": ["2021-02-20", "2021-02-21", "2021-02-22", "2021-02-23"]
}
```

If the request is successful, it returns the predicted values in a dictionary in following scheme:
```
{
    // Each day represents the date passed in the request
    day: [
        // For a given day, different intervals that are specified by start and end time are given with predicted tip values
        {
            cash_tips,
            credit_card_tips,
            end_time,
            start_time
        },
        ...
    ],
    ...
}

```
If for a given day, the value is set to `null`, it means there isn't sufficient data to make predictions for that day.

Example Response:

```
{
    "result": {
        "2021-02-20": [
            {
                "cash_tips": 10.9,
                "credit_card_tips": 17.16,
                "end_time": "2021-04-01 10:30:00",
                "start_time": "2021-04-01 10:00:00"
            },
            {
                "cash_tips": 10.87,
                "credit_card_tips": 17.29,
                "end_time": "2021-04-01 11:00:00",
                "start_time": "2021-04-01 10:30:00"
            },
            {
                "cash_tips": 11.23,
                "credit_card_tips": 20.53,
                "end_time": "2021-04-01 11:30:00",
                "start_time": "2021-04-01 11:00:00"
            },
            ...
        ],
        "2021-02-21": [
            {
                "cash_tips": 15.35,
                "credit_card_tips": 14.4,
                ...
            },
            ...
        ],
        "2021-02-22": null,
        ...
}
```

If there are any errors, the response will contain a description about the error. An example error response is:
```
{
    "error": "We do not have sufficient data to make accurate predictions. Please continue entering shift data."
}
```
