from flask import Blueprint, request, jsonify
from models import db, Receipt, Image
import datetime
import calendar
from config import S3_LOCATION, S3_BUCKET_NAME
from werkzeug import secure_filename
from app import s3

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
        # AFTER SUCCESSFUL RECEIPT CREATION, ADD IMAGES
        for image in receipt_data['pic_urls']:
            new_image = Image(location=image, receipt=receipt)
            db.session.add(new_image)
            try:
                db.session.commit()
            except Exception as e:
                db.session.rollback()
                db.session.flush()
                return jsonify({"Error": "Failed to add image(s)"})
    except Exception as e:
        db.session.rollback()
        db.session.flush()
        failed = True

    if failed:
        return jsonify({"Error": "Failed to create new receipt"})
    return jsonify({"Success": "New receipt created"})


@receipt_controller.route('/', defaults={'year': None, 'month': None},
                          methods=['GET'])
@receipt_controller.route('/<int:year>/<int:month>', methods=['GET'])
def get_all_receipts(year, month):
    total_amount = 0
    receipts = []

    if year is None and month is None:
        receipts = Receipt.query.all()
        # Receipt.query.all() returns empty list if there are no records
        if receipts == []:
            return receipts
    elif year is not None and month is not None:
        num_days = calendar.monthrange(year, month)[1]
        start_date = datetime.date(year, month, 1)
        end_date = datetime.date(year, month, num_days)

        receipts = (Receipt.query
                    .filter(Receipt.receipt_date <= end_date)
                    .filter(Receipt.receipt_date >= start_date)
                    .order_by(Receipt.receipt_date.desc()))

    for receipt in receipts:
        total_amount += receipt.amount

    return jsonify(total_amount=str(total_amount),
                   posts=[receipt.to_dict() for receipt in receipts])


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

@receipt_controller.route('/images', methods=["POST"])
def upload_images():
    if request.method == "POST":
        all_images = request.files.getlist('files')
        image_locations = []
        try:
            for image in all_images:
                filename = secure_filename(image.filename)
                image.save(filename)
                s3.upload_file(
                    Bucket = S3_BUCKET_NAME,
                    Filename=filename,
                    Key=filename
                )
                image_locations.append("{}{}".format(S3_LOCATION, filename))
            return jsonify({'locations': image_locations})
        except Exception as e:
            print(e)
            return jsonify({'did not': 'work'})
