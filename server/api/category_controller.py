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
    category_expenses = []
    category = ''
    expense = 0

    receipts = (Receipt.query
                .filter(Receipt.receipt_date <= end_date)
                .filter(Receipt.receipt_date >= start_date)
                .order_by(Receipt.category.desc()))

    for receipt in receipts:
        if category == '':
            category = receipt.category

        if receipt.category == category:
            expense += receipt.amount
        else:
            category_expenses.append({'category': category,
                                      'expense': float(expense)})
            category = receipt.category
            expense = receipt.amount

    category_expenses.append({'category': category,
                              'expense': float(expense)})
    return jsonify(categories=category_expenses)
