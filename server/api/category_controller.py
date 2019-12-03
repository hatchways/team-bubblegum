from flask import Blueprint, request, jsonify
from models import db, Receipt
import datetime as dt
import calendar

category_controller = Blueprint('category_controller',
                                __name__, url_prefix='/categories')


@category_controller.route('/<int:year>/<int:month>', methods=['GET'])
def get_category_expenses(year, month):
    num_days = calendar.monthrange(year, month)[1]
    start_date = dt.date(year, month, 1)
    end_date = dt.date(year, month, num_days)

    receipts = (Receipt.query
                .filter(Receipt.receipt_date <= end_date)
                .filter(Receipt.receipt_date >= start_date)
                .with_entities(Receipt.category, db.func.sum(Receipt.amount).label("expense"))
                .group_by(Receipt.category)
                .order_by(db.func.sum(Receipt.amount).desc())
                .limit(3))

    return jsonify(categories=[{"category": receipt.category,
                                "expense": float(receipt.expense)}
                               for receipt in receipts])
