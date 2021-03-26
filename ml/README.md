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