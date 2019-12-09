from flask import Blueprint, jsonify
from config import SENDGRID_API_KEY
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

emails = Blueprint('emails', __name__, url_prefix='/emails')


@emails.route('/monthly-overview/<int:user_id>', methods=['GET'])
def end_of_month_overview():
    message = Mail(
        from_email='no-reply@receipttracker.com',
        to_emails='user@test.com',
        subject='Your monthly expense overview',
        html_content='Monthly expense overview here')
    try:
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        sg.send(message)
    except Exception as e:
        return jsonify({"Error": "Failed to send email"})

@emails.route('/reset-password', methods=['PUT'])
def reset_password():
    message = Mail(
        from_email='no-reply@receipttracker.com',
        to_emails='user@test.com',
        subject='Reset your password',
        html_content='Link to reset password')
    try:
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        sg.send(message)
    except Exception as e:
        return jsonify({"Error": "Failed to send reset password email"})
