from flask import Blueprint, jsonify, request
from models import db, Receipt
import datetime as dt
import calendar
import api.users as usr

category_controller = Blueprint('category_controller',
                                __name__, url_prefix='/categories')


@category_controller.route('/<int:year>/<int:month>', methods=['GET'])
def get_category_expenses(year, month, is_email=False, user_id=None):
    if not is_email:
        auth_header = request.headers.get('Authorization')
        if auth_header:
            user_id = usr.decode_auth_token(auth_header)
            if not isinstance(user_id, int):
                return jsonify({"Error": "Failed to authenticate"})
        else:
            return jsonify({"Error": "Failed to authenticate"})

    num_days = calendar.monthrange(year, month)[1]
    start_date = dt.date(year, month, 1)
    end_date = dt.date(year, month, num_days)

    receipts = (Receipt.query
                .filter(Receipt.user_id == user_id)
                .filter(Receipt.receipt_date <= end_date)
                .filter(Receipt.receipt_date >= start_date)
                .with_entities(Receipt.category, db.func.sum(Receipt.amount).label("expense"))
                .group_by(Receipt.category)
                .order_by(db.func.sum(Receipt.amount).desc()))

    if not is_email:
        receipts = receipts.limit(3)

    return jsonify(categories=[{"category": receipt.category,
                                "expense": float(receipt.expense)}
                               for receipt in receipts])
