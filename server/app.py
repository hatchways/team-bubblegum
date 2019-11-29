from flask import Flask
from api.ping_handler import ping_handler
from api.home_handler import home_handler
from api.receipt_controller import receipt_controller
from api.category_controller import category_controller
from models import db
from config import DB_USERNAME, DB_PASSWORD, DB_NAME

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://{}:{}@localhost/{}'.format(DB_USERNAME, DB_PASSWORD, DB_NAME)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

with app.app_context():
    db.create_all()

app.register_blueprint(home_handler)
app.register_blueprint(ping_handler)
app.register_blueprint(receipt_controller)
app.register_blueprint(category_controller)
