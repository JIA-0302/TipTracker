from flask import Flask, request, jsonify
from dotenv import load_dotenv
import os

from util import parse_request_body, DatasetError
from predictor import Predictor

# Loads the environment variables from .env file for development 
load_dotenv()

app = Flask(__name__)

@app.route('/')
def index():
    return 'See <a href="https://github.com/JIA-0302/TipTracker/tree/main/ml/README.md">documentation</a> for usage'


@app.route('/predict-tips', methods=["POST"])
def predict_tips():
    # Retrieve the request body
    req_body = request.get_json()
    if req_body is None:
        return {'error': 'Please provide necessary parameters'}, 400

    try:
        # Parse the request body to retreive required parameters
        user_id, search_dates = parse_request_body(req_body)
    except Exception as err:
        print(err)
        return {'error': str(err)}, 400

    try:
        # Get predicted tips for each specified day
        predictor = Predictor(user_id=user_id, search_dates=search_dates)
        return predictor.get_predicted_tips(), 200
    except DatasetError as err:
        return {'error': str(err)}, 500
    except Exception as err:
        print(err)
        return {'error': 'Failed to predict tips for the user. Please try again later'}, 500


if __name__ == '__main__':
    app.run(debug=True)
