from flask import Flask, request, jsonify
from util import parse_request_body
from predictor import Predictor

app = Flask(__name__)


@app.route('/')
def index():
    return 'See <a href="https://github.com/JIA-0302/TipTracker/tree/main/ml/README.md">documentation</a> for usage'


@app.route('/predict-tips', methods=["POST"])
def predict_tips():
    req_body = request.get_json()
    if req_body is None:
        return {'error': 'Please provide necessary parameters'}, 400

    try:
        user_id, search_dates = parse_request_body(req_body)
    except Exception as err:
        print(err)
        return {'error': str(err)}, 400

    try:
        predictor = Predictor(user_id=user_id, search_dates=search_dates)
        return predictor.get_predicted_tips(), 200
    except Exception as err:
        print(err)
        return {'error': 'Failed to predict tips for the user. Please try again later'}, 500


if __name__ == '__main__':
    app.run(debug=True)
