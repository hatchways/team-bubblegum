from flask import Flask
from api.ping_handler import ping_handler
from api.home_handler import home_handler
from models import db


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://{}:{}@localhost/{}'.format(DB_USERNAME, DB_PASSWORD, DB_NAME)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

app.register_blueprint(home_handler)
app.register_blueprint(ping_handler)

