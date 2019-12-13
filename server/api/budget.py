from flask import Blueprint, request, jsonify
from models import db, Receipt, Image, User
import datetime as dt
from datetime import datetime
import calendar
from config import S3_LOCATION, S3_BUCKET_NAME
from werkzeug import secure_filename
from app import s3
import api.users as usr
import requests

budget = Blueprint('budget', __name__, url_prefix='/budget')

@budget.route('/', methods=['GET'])
def get_budget():
    auth_header = request.headers.get('Authorization')
    if auth_header:
        user_id = usr.decode_auth_token(auth_header)
        if not isinstance(user_id, int):
            return jsonify({"Error": "Failed to authenticate"})
    else:
        return jsonify({"Error": "Failed to authenticate"})

    if(request.method == 'GET'):
        find_user = User.query.filter_by(id=user_id).first()
        return jsonify(find_user.to_dict())

@budget.route('/update', methods=['PUT'])
def update_budget():
    auth_header = request.headers.get('Authorization')
    if auth_header:
        user_id = usr.decode_auth_token(auth_header)
        if not isinstance(user_id, int):
            return jsonify({"Error": "Failed to authenticate"})
    else:
        return jsonify({"Error": "Failed to authenticate"})

    if(request.method == 'PUT'):
        find_user = User.query.filter_by(id=user_id).first()
        new_data = request.json
        find_user.annualIncome = new_data['annualIncome']
        find_user.monthlyIncome = new_data['monthlyIncome']
        find_user.percentSave = new_data['percentSave']

        try:
            db.session.add(find_user)
            db.session.commit()
            return jsonify({'success': 'Budget updated'})
        except:
            return jsonify({'error': 'Opps. Something went wrong. Please try again later.'})
        
