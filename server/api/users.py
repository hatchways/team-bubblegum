from flask import Blueprint, request, jsonify
from config import SECRET_KEY
from app import bcrypt
from models import db, User
import jwt, json, re
import api.emails as eml

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

    eml.welcome_email(body["email"])
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


def get_all_users():
    all_users = User.query.all()
    return jsonify(users=[user.to_dict() for user in all_users])


def decode_auth_token(auth_header):
    auth_token = auth_header.split(" ")[1]

    try:
        payload = jwt.decode(auth_token, SECRET_KEY)
        user_entry = User.query.filter(User.email == payload['email']).first_or_404()
        user_id = user_entry.id
        return user_id
    except jwt.ExpiredSignatureError:
        return jsonify({"Error": "Signature expired. Please log in again."})
    except jwt.InvalidTokenError:
        return jsonify({"Error": "Invalid token. Please log in again."})
