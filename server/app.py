from flask import Flask, request, redirect, url_for, render_template, jsonify
from flask_sqlalchemy import SQLAlchemy
from api.ping_handler import ping_handler
from api.home_handler import home_handler
from api.receipt_controller import receipt_controller
from flask_bcrypt import Bcrypt
from email_validator import validate_email
from models import bcrypt, User, db
import jwt
import json
import re
from config import DB_USERNAME, DB_PASSWORD, DB_NAME, S3_ACCESS_KEY, S3_SECRET_KEY
import boto3

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://{}:{}@localhost/{}'.format(DB_USERNAME, DB_PASSWORD, DB_NAME)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'bubblegum'
db= SQLAlchemy(app)
bcrypt = Bcrypt(app)

@app.route('/signup', methods=['POST'])
def signup():
  body = json.loads(request.get_data())
  EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')
  if EMAIL_REGEX.match(body['email']) == None: 
    return jsonify({'err':'Please enter a valid email'})
  if len(body["password"]) < 6:
    return jsonify({'err': 'Password must be 6 letters or more'})
  
  user = User(body["email"], body["password"])
  try:  
    db.session.add(user)
    db.session.commit()
  except:
    return jsonify({'err': 'Account already exists'})

  token = jwt.encode(body, app.config['SECRET_KEY']).decode("utf-8")
  return jsonify({'token': token})
  
@app.route('/login', methods=['POST'])
def login():
  if request.method == 'POST':
    body = json.loads(request.get_data())
    find_user = User.query.filter_by(email=body['email']).first()
    if find_user:
      is_authenticated = bcrypt.check_password_hash(find_user.password, body['password'])
      if is_authenticated:
        token = jwt.encode(body, app.config['SECRET_KEY']).decode("utf-8")
        return jsonify({'token': token})
      else:
        return jsonify({'err': 'Invalid credentials'})
    else: 
      return jsonify({'err': 'Invalid credentials'})
  return jsonify({'err': 'Invalid credentials'})

with app.app_context():
    db.create_all()

s3 = boto3.client(
    "s3",
    aws_access_key_id=S3_ACCESS_KEY,
    aws_secret_access_key=S3_SECRET_KEY
)

app.register_blueprint(home_handler)
app.register_blueprint(ping_handler)
app.register_blueprint(receipt_controller)
