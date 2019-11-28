from flask import Blueprint, request, jsonify
from models import db, Receipt
import datetime as dt
from datetime import datetime
import calendar

receipt_controller = Blueprint('receipt_controller',
                               __name__, url_prefix='/receipts')


@receipt_controller.route('/', methods=['POST'])
def create():
    receipt_data = request.json

    amount = receipt_data['amount']
    title = receipt_data['title']
    category = receipt_data['category']
    receipt_date = receipt_data['receipt_date']
    pic_url = receipt_data['pic_url']

    receipt = Receipt(amount=amount, title=title, receipt_date=receipt_date,
                      pic_url=pic_url, category=category)
    db.session.add(receipt)

    failed = False
    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        db.session.flush()
        failed = True

    if failed:
        return jsonify({"Error": "Failed to create new receipt"})
    return jsonify({"Success": "New receipt created"})


@receipt_controller.route('/', methods=['GET'])
@receipt_controller.route('/<int:year>', methods=['GET'])
@receipt_controller.route('/<int:year>/<int:month>', methods=['GET'])
@receipt_controller.route('/<int:year>/<int:month>/<int:date>', methods=['GET'])
def get_all_receipts(year=None, month=None, date=None, weekly=False,
                     start_date=None, end_date=None):
    if request.args.get('weekly') is not None:
        weekly = int(request.args.get('weekly'))
    total_amount = 0

    # if user provides start and end dates
    if request.args.get('start_date') is not None and request.args.get('end_date') is not None:
        start_date = datetime.strptime(request.args.get('start_date'), '%Y-%m-%d')
        end_date = datetime.strptime(request.args.get('end_date'), '%Y-%m-%d')
    # show all receipts
    elif year is None and month is None and date is None:
        start_date = datetime.min
        end_date = datetime.max
    # filter by year
    elif year is not None and month is None and date is None:
        start_date = dt.date(year, 1, 1)
        end_date = dt.date(year, 12, 31)
    # filter by month
    elif year is not None and month is not None and date is None:
        num_days = calendar.monthrange(year, month)[1]
        start_date = dt.date(year, month, 1)
        end_date = dt.date(year, month, num_days)
    # filter by day/week
    elif year is not None and month is not None and date is not None:
        if weekly:
            start_date = dt.date(year, month, date)
            day_of_week = start_date.isoweekday()
            if day_of_week != 7:
                start_date -= dt.timedelta(days=day_of_week)
            end_date = start_date + dt.timedelta(days=6)
        else:
            start_date = dt.date(year, month, date)
            end_date = dt.date(year, month, date)

    receipts = (Receipt.query
                .filter(Receipt.receipt_date <= end_date)
                .filter(Receipt.receipt_date >= start_date)
                .order_by(Receipt.receipt_date.desc()))

    for receipt in receipts:
        total_amount += receipt.amount

    return jsonify(total_amount=str(total_amount),
                   posts=[receipt.to_dict() for receipt in receipts])


@receipt_controller.route('/daily-expenses/<int:year>/<int:month>', methods=['GET'])
def get_daily_expenses_of_month(year, month):
    start, end = calendar.monthrange(year, month)
    daily_expenses = []
    for date in range(start, end + 1):
        daily_total = get_all_receipts(year, month, date)
        date_str = datetime.strftime(dt.datetime(year, month, date), '%b %d')
        daily_expenses.append({'date': date_str,
                               'expense': float(daily_total.json['total_amount'])})
    return jsonify(data=daily_expenses)


@receipt_controller.route('/<int:id>', methods=['GET'])
def get_receipt(id):
    receipt = Receipt.query.get_or_404(id)
    return jsonify(receipt.to_dict())


@receipt_controller.route('/<int:id>', methods=['PATCH', 'PUT'])
def update_receipt(id):
    receipt = Receipt.query.get_or_404(id)
    receipt_data = request.json

    receipt.amount = receipt_data['amount']
    receipt.title = receipt_data['title']
    receipt.category = receipt_data['category']
    receipt.receipt_date = receipt_data['receipt_date']
    receipt.pic_url = receipt_data['pic_url']

    db.session.add(receipt)

    failed = False
    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        db.session.flush()
        failed = True

    if failed:
        return jsonify({"Error": "Failed to update receipt"})
    return jsonify({"Success": "Receipt updated"})
