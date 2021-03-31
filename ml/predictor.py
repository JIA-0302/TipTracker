import sklearn.ensemble import RandomForestRegressor
from util import SELECTED_FEATURES, SELECTED_LABELS

# Parameters for Random Forest
n_trees = 100
max_depth = None
samples_split = 2
verbose = 1

class Predictor:
    def __init__(self, dataset):
        self.dataset = dataset
        self.__get_features_and_labels()

    def __get_features_and_labels(self):
        self.X = np.array(dataset[SELECTED_FEATURES])
        self.y = np.array(dataset[SELECTED_LABELS])

    def perform_regression(self):
        self.regression = RandomForestRegressor(n_estimators=n_trees, max_depth=max_depth, min_samples_split=samples_split, verbose=verbose)
        self.regression.fit(self.X, self.y)

    def get_predicted_values(self, input_values):
        if self.regression is None:
            self.perform_regression()

        return regression.predict(input_values)
