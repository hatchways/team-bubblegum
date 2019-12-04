from flask import Blueprint
from config import SENDGRID_API_KEY
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

emails = Blueprint('emails', __name__, url_prefix='emails')


@emails.route('/monthly-overview', methods=['GET'])
def end_of_month_expenses():
    message = Mail(
        from_email='no-reply@receipttracker.com',
        to_emails='user@test.com',
        subject='Your monthly expense overview',
        html_content='Monthly expense overview here')
    try:
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
    except Exception as e:
        print(e)


@emails.route('/reset-password', methods=['PUT'])
def reset_password():
    message = Mail(
        from_email='no-reply@receipttracker.com',
        to_emails='user@test.com',
        subject='Reset your password',
        html_content='Link to reset password')
    try:
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
    except Exception as e:
        print(e)
