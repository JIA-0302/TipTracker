import configparser
import pymongo
import os

# Get env variables for database configuration
MONGODB_URL = os.environ.get('MONGODB_URL', None)
DATABASE_NAME = os.environ.get('DATABASE_NAME', None)
DATASET_COLLECTION_NAME = os.environ.get(
    'DATASET_COLLECTION_NAME', 'future_trends')

class MongoDatabase:
    def __init__(self):
        print("Establishing connection to the database")
        if MONGODB_URL is None or DATABASE_NAME is None:
            raise Exception(
                'Database could not be identified. Make sure they are added to environment variables')

        self.connection_string = MONGODB_URL
        self.client = pymongo.MongoClient(self.connection_string)
        self.database = self.client[DATABASE_NAME]

        self.verify_connection()

    def reset_connection(self):
        self.client = pymongo.MongoClient(self.connection_string)

    def verify_connection(self):
        for _ in range(5):
            try:
                self.client.server_info()
                print("Connected to the database")
                return
            except:
                self.reset_connection()

        raise "Failed to connect to the database"


class FutureTrendsDatabase(MongoDatabase):
    def __init__(self):
        MongoDatabase.__init__(self)

    def get_future_trends_collection(self) -> pymongo.collection:
        return self.database[DATASET_COLLECTION_NAME]

    def get_future_trends_by_filter(self, filter):
        return list(self.get_future_trends_collection().find(filter))
