from flask import Blueprint, jsonify
from config import SENDGRID_API_KEY
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from models import db, User
import receipt_controller as rc
import category_controller as cc
import datetime as dt

emails = Blueprint('emails', __name__, url_prefix='emails')


@emails.route('/monthly-overview/<int:user_id>', methods=['GET'])
def end_of_month_overview(user_id, user_email):
    yesterday = dt.date.today() - dt.timedelta(days=1)
    year = yesterday.year
    month = yesterday.month

    user = User.query.get_or_404(user_id)
    user_email = user.email

    # need to take in user id or email for user specific receipts
    daily_expense = rc.get_daily_expenses_of_month(year, month)

    # a chart that we can display in the email (temporary?)
    chart = ('https://image-charts.com/chart?'
             'chs=350x250&'  # chart size
             'cht=lc&'  # chart type = line chart
             'chxt=x,y&'  # axis to display
             'chxr=0,1,30,10|1,0,30&'  # axis range
             'chxl=0:|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30&'  # custom axis label
             'chd=t:1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30')  # chart data

    categories_sec = cc.get_category_expenses(year, month)

    message = Mail(
        from_email='no-reply@receipttracker.com',
        to_emails=user_email,
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
