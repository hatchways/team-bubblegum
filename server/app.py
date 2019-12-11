from flask import Flask
from celery import Celery
from flask_bcrypt import Bcrypt
from config import DB_USERNAME, DB_PASSWORD, DB_NAME, S3_ACCESS_KEY, S3_SECRET_KEY
import boto3

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://{}:{}@localhost/{}'.format(
    DB_USERNAME, DB_PASSWORD, DB_NAME)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
bcrypt = Bcrypt(app)

from models import db

db.init_app(app)

with app.app_context():
    db.create_all()

app.config['CELERY_BROKER_URL'] = 'amqp://localhost//'
celery = Celery(app.name, broker=app.config['CELERY_BROKER_URL'])
celery.conf.update(app.config)

s3 = boto3.client(
    "s3",
    aws_access_key_id=S3_ACCESS_KEY,
    aws_secret_access_key=S3_SECRET_KEY
)

from api.ping_handler import ping_handler
from api.home_handler import home_handler
from api.users import users
from api.receipt_controller import receipt_controller
from api.category_controller import category_controller
from api.emails import emails

app.register_blueprint(home_handler)
app.register_blueprint(ping_handler)
app.register_blueprint(users)
app.register_blueprint(receipt_controller)
app.register_blueprint(category_controller)
app.register_blueprint(emails)
