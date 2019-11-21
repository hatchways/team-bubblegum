from flask import Blueprint, request, flash
from server.models import db, Receipt

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
        return flash("Error: failed to create new receipt")
    return flash("New receipt created")
