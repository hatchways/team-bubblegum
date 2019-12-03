from flask import Blueprint, request, jsonify
from config import SECRET_KEY
from app import bcrypt
from models import db, User
import jwt, json, re

users = Blueprint('users', __name__)

@users.route('/signup', methods=['POST'])
def signup():
  body = json.loads(request.get_data())
  EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')
  if EMAIL_REGEX.match(body['email']) == None: 
    return jsonify({'err':'Please enter a valid email'})
  if len(body["password"]) < 6:
    return jsonify({'err': 'Password must be 6 letters or more'})
  
  user = User(email=body["email"], password=body["password"])
  try:
    db.session.add(user)
    db.session.commit()
  except:
    return jsonify({'err': 'Account already exists'})

  token = jwt.encode(body, SECRET_KEY).decode("utf-8")
  return jsonify({'token': token})
  
@users.route('/login', methods=['POST'])
def login():
  if request.method == 'POST':
    body = json.loads(request.get_data())
    find_user = User.query.filter_by(email=body['email']).first()
    if find_user:
      is_authenticated = bcrypt.check_password_hash(find_user.password, body['password'])
      if is_authenticated:
        token = jwt.encode(body, SECRET_KEY).decode("utf-8")
        return jsonify({'token': token})
      else:
        return jsonify({'err': 'Invalid credentials'})
    else: 
      return jsonify({'err': 'Invalid credentials'})
  return jsonify({'err': 'Invalid credentials'})