from flask import Blueprint, request
from ..models import db, Receipt
from datetime import date

receipt_controller = Blueprint('receipt_controller',
                               __name__, url_prefix='/receipts')


@receipt_controller.route('', methods=['POST'])
def create():
    receipt_data = request.json

    amount = receipt_data['amount']
    title = receipt_data['title']
    category = receipt_data['category']
    receipt_date = receipt_data['receipt_date']
    date_created = receipt_data['date_created']
    pic_url = receipt_data['pic_url']

    receipt = Receipt(amount=amount, title=title, category=category,
                      receipt_date=receipt_date, date_created=date_created,
                      pic_url=pic_url)
    db.session.add(receipt)
    db.session.commit()
