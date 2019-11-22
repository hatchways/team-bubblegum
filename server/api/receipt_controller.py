from flask import Blueprint, request, flash, jsonify
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


@receipt_controller.route('/', methods=['GET'])
def get_all_receipts():
    receipts = Receipt.query.all()
    # Receipt.query.all() returns empty list if there are no records
    if receipts == []:
        return receipts
    return [receipt.to_dict() for receipt in receipts]


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
        return flash("Error: failed to update receipt")
    return flash("Receipt updated")
