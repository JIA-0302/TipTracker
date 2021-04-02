# Protected Routes

When accessing any of the following API routes, the user must be logged in.
The JWT must be stored in the cookie and should be passed on each request for authentication.
All the base url for the API routes will be `/api/*`.

Some available API endpoints are:

- [`/shift-details`](#shift-details)
- [`/shift-details/worked`](#shift-details-worked)
- [`/shift-details/hourly/:id`](#shift-details-hourly)
- [`/shift-details/non-hourly/:id`](#shift-details-non-hourly)
- [`/future-trends`](#future-trends)

<hr />

<div id="shift-details"></div>

## `/shift-details`

#### **GET** `/shift-details`

This will return all the shift details of the user, both hourly and non-hourly.
A sample response is:

```
{
    "hourlyShiftDetails": [
        {
            "shift_id": 8,
            "user_id": 3,
            "employer_id": 2,
            "shift_date": "2021-02-20T05:00:00.000Z",
            "start_time": "2021-02-20T23:00:00.000Z",
            "end_time": "2021-02-21T03:00:00.000Z",
            "hourly_wage": 20,
            "credit_card_tips": 69,
            "cash_tips": 69,
            "created_at": "2021-02-23T22:53:39.546Z",
            "updated_at": "2021-02-23T22:53:39.546Z"
        }
    ],
    "nonHourlyShiftDetails": [
        {
            "shift_id": 9,
            "user_id": 3,
            "employer_id": 2,
            "shift_date": "2021-02-21T05:00:00.000Z",
            "total_base_earning": 420,
            "credit_card_tips": 96,
            "cash_tips": 69,
            "created_at": "2021-02-23T22:54:40.555Z",
            "updated_at": "2021-02-23T22:54:40.555Z"
        }
    ]
}

```

#### **POST** `/shift-details`

This endpoint is used to add shift data for the user. The body parameters for the request are as follows:
| Parameter | Description | Required |
|-----------|-------------|----------|
| wageType | specified the type of wage. Accepted values are `HOURLY` and `NON_HOURLY` | Yes |
| shift_date | the day for which the data is being added. It should be formatted as `yyyy-MM-dd` | Yes |
| start_time | the start time for the shift. It should be the same time as the shift_date. It should be formatted as `yyyy-MM-dd HH:mm:ss` | Yes for `HOURLY` |
| end_time | the end time for the shift. It should not be before the start_time. It should be formatted as `yyyy-MM-dd HH:mm:ss` | Yes for `HOURLY` |
| hourly_wage | hourly wage rate for the hourly workers. | Yes for `HOURLY` |
| credit_card_tips | total credit card tips earned for the shift <br/> Default: `0` | No |
| cash_tips | total cash tips earned for the shift <br/> Default: `0` | No |
| total_base_earning | total base earning for the shift <br/> Default: `0` | No |

Example Request Body:

```
{
    "wageType": "HOURLY",
    "shift_date": "2021-02-20",
    "start_time": "2021-02-20 18:00:00",
    "end_time": "2021-02-20 22:00:00",
    "hourly_wage": "420",
    "credit_card_tips": "69",
    "cash_tips": "71"
}
```

If the request is successful, it will return the `id` and the wage type for the newly created shift.
Example Response:

```
{
    "success": true,
    "shiftDetail": {
        "shift_id": 8,
        "wageType": "HOURLY"
    }
}
```

<div id="shift-details-worked"></div>

## `/shift-details/worked`

#### **GET** `/shift-details/worked`

This endpoint is used to retrieve list of `shift_id` for the days worked in the given month.
The month and the year are specified in the query.
The request parameters are as follows:
| Parameter | Description | Required |
|-----------|-------------|----------|
| month | Month to retrieve the data. It should be `1-12` where `1-January, 2-February, ..., 12-December` | Yes |
| shift_date | Year to retrieve the data. It should be formatted as `yyyy` | Yes |
An example of a valid request is `/api/shift-details/worked?month=2&year=2021`.

If the request is valid, the following response is generated:

```
{
    "hourlyShiftDetails": [
        {
            "shift_id": 8,
            "shift_date": "2021-02-20T05:00:00.000Z"
        }
    ],
    "nonHourlyShiftDetails": [
        {
            "shift_id": 9,
            "shift_date": "2021-02-20T05:00:00.000Z"
        }
    ]
}
```

<div id="shift-details-hourly"></div>

## `/shift-details/hourly/:id`

These routes are used for the specific `HOURLY` type shift data defined by `shift_id` which is provided in the URL.

#### **GET** `/shift-details/hourly/:id`

This returns the details about the shift with provided `:id`.
For example, to get details about shift with `id` `8`, the request will be:
`GET /shift-details/hourly/8`.
If the specified shift is found, the sample response is:

```
{
    "shiftDetail": {
        "shift_id": 8,
        "user_id": 3,
        "employer_id": 2,
        "shift_date": "2021-02-20T05:00:00.000Z",
        "start_time": "2021-02-20T23:00:00.000Z",
        "end_time": "2021-02-21T03:00:00.000Z",
        "hourly_wage": 20,
        "credit_card_tips": 69,
        "cash_tips": 69,
        "created_at": "2021-02-23T22:53:39.546Z",
        "updated_at": "2021-02-23T22:53:39.546Z"
    }
}
```

#### **PUT** `/shift-details/hourly/:id`

This is used to update the details about the shift specified by `:id`.
The body parameters for the request are as follows:
| Parameter | Description | Required |
|-----------|-------------|----------|
| shift_date | the day for which the data is being added. It should be formatted as `yyyy-MM-dd` | Yes |
| start_time | the start time for the shift. It should be the same time as the shift_date. It should be formatted as `yyyy-MM-dd HH:mm:ss` | Yes |
| end_time | the end time for the shift. It should not be before the start_time. It should be formatted as `yyyy-MM-dd HH:mm:ss` | Yes |
| hourly_wage | hourly wage rate for the shift | Yes |
| credit_card_tips | total credit card tips earned for the shift <br/> Default: `0` | No |
| cash_tips | total cash tips earned for the shift <br/> Default: `0` | No |

Example Request Body:

```
{
    "shift_date": "2021-02-20",
    "start_time": "2021-02-20 18:00:00",
    "end_time": "2021-02-20 22:00:00",
    "hourly_wage": "420",
    "credit_card_tips": "69",
    "cash_tips": "71"
}
```

If the request is successful, it will simply return a success message.
Example Response:

```
{
    "success": true
}
```

#### **DELETE** `/shift-details/hourly/:id`

This is used to delete the specified shift data.

For example, to delete a hourly shift data with `id` 8:
`DELETE /shift-details/hourly/8`

If the request is successful, it will return a success message.

```
{
    "success": true
}
```

<div id="shift-details-non-hourly"></div>

## `/shift-details/non-hourly/:id`

These routes are used for the specific `NON_HOURLY` type shift data defined by `shift_id` which is provided in the URL.

#### **GET** `/shift-details/non-hourly/:id`

This returns the details about the shift with provided `:id`.

For example, to get details about shift with `id` `8`, the request will be:
`GET /shift-details/non-hourly/8`.
If the specified shift is found, the sample response is:

```
{
    "shiftDetail": {
        "shift_id": 8,
        "user_id": 3,
        "employer_id": 2,
        "shift_date": "2021-02-20T05:00:00.000Z",
        "total_base_earning": 420,
        "credit_card_tips": 96,
        "cash_tips": 69,
        "created_at": "2021-02-23T22:54:40.555Z",
        "updated_at": "2021-02-23T22:54:40.555Z"
    }
}
```

#### **PUT** `/shift-details/non-hourly/:id`

This is used to update the details about the shift specified by `:id`.
The body parameters for the request are as follows:
| Parameter | Description | Required |
|-----------|-------------|----------|
| shift_date | the day for which the data is being added. It should be formatted as `yyyy-MM-dd` | Yes |
| total_base_earning | total base earning for the shift <br/> Default: `0` | No |
| credit_card_tips | total credit card tips earned for the shift <br/> Default: `0` | No |
| cash_tips | total cash tips earned for the shift <br/> Default: `0` | No |

Example Request Body:

```
{
    "shift_date": "2021-02-20",
    "total_base_earning": "420",
    "credit_card_tips": "96",
    "cash_tips": "69"
}
```

If the request is successful, it will simply return a success message.
Example Response:

```
{
    "success": true
}
```

#### **DELETE** `/shift-details/non-hourly/:id`

This is used to delete the specified shift data.

For example, to delete an non-hourly shift data with `id` 8:
`DELETE /shift-details/non-hourly/8`

If the request is successful, it will return a success message.

```
{
    "success": true
}
```

<div id="#future-trends"></div>

## `/future-trends`
These routes are used to predict tips for a user.

#### **POST** `/future-trends`

This is used to retrieve the predicted most profitable shifts for the specified dates. The body parameters for the request are as follows:

| Parameter | Description | Required |
|-----------|-------------|----------|
| shift_dates | List of dates for which we need to predict tips. Each date should be formatted as `yyyy-MM-dd` | Yes |

Example Request Body:
```
{
    "shift_dates": ["2021-04-01", "2021-04-05", "2021-04-06", "2021-04-07"]
}
```

If the request is successful, it will return the details about the shift for each day as follows:
```
{
    "result": {
        "2021-04-01": {
            "start_time": "17:00:00",
            "end_time": "21:00:00",
            "cash_tips": 155.33999999999997,
            "credit_card_tips": 158.07999999999998,
            "hour": 4
        },
        "2021-04-05": {
            "start_time": "10:00:00",
            "end_time": "14:00:00",
            "cash_tips": 86.28,
            "credit_card_tips": 85.11999999999999,
            "hour": 4
        },
        "2021-04-06": null,
        "2021-04-07": {
            "start_time": "18:00:00",
            "end_time": "22:00:00",
            "cash_tips": 103.95,
            "credit_card_tips": 83.86,
            "hour": 4
        }
    }
}
```

If `null` is set for any of the shift day, it means there wasn't sufficient data to make accurate predictions for that day.

In addition, we cannot make predictions for new users without having sufficient data about their earnings. On such instances, the following response is returned:
```
{
    "error": "We do not have sufficient data to make accurate predictions. Please continue entering shift data."
}
```
To improve preformance of web application, we created a separate microservice to predict tips ([more info here](https://github.com/JIA-0302/Analytics)). Hence, for cases when the service is unavailable, the following response can be seen:
```
{
    "error": "Error connecting to the server. Please try again later"
}
```