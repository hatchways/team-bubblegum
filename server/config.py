import os

TEAM_NAME = os.environ['TEAM_NAME']
SECRET_KEY = os.environ['SECRET_KEY']

DB_USERNAME = os.environ['DB_USERNAME']
DB_PASSWORD = os.environ['DB_PASSWORD']
DB_NAME = os.environ['DB_NAME']

S3_ACCESS_KEY = os.environ.get('S3_ACCESS_KEY')
S3_SECRET_KEY = os.environ.get('S3_SECRET_KEY')
S3_BUCKET_NAME = os.environ.get('S3_BUCKET_NAME')
S3_LOCATION = 'http://{}.s3.amazonaws.com/'.format(S3_BUCKET_NAME)

SENDGRID_API_KEY = os.environ.get('SENDGRID_API_KEY')
TEST_EMAIL1 = os.environ.get('TEST_EMAIL1')
TEST_EMAIL2 = os.environ.get('TEST_EMAIL2')
