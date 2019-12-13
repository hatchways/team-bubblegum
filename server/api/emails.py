from flask import Blueprint, jsonify, request, url_for
from config import SENDGRID_API_KEY, SECRET_KEY, TEST_EMAIL1, TEST_EMAIL2
from itsdangerous import URLSafeTimedSerializer
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, TemplateId
from models import db, User
import api.receipt_controller as rc
import api.category_controller as cc
import datetime as dt
import calendar
import json
import api.users as usr

emails = Blueprint('emails', __name__, url_prefix='/emails')


@emails.route('/monthly-overview/<int:user_id>', methods=['GET'])
def end_of_month_overview(user_id):
    yesterday = dt.date.today() - dt.timedelta(days=1)
    year = yesterday.year
    month = yesterday.month

    user = User.query.get_or_404(user_id)
    user_email = user.email

    # calculate daily expense total
    end = calendar.monthrange(year, month)[1]
    date_label = ""
    daily_expenses = ""
    for date in range(1, end + 1):
        start_date = dt.date(year, month, date)
        end_date = dt.date(year, month, date)
        receipts = rc.get_receipts_from_database(user_id, start_date, end_date)
        daily_total = rc.get_receipts_total_expense(receipts)
        if date < end:
            date_label = date_label + str(date) + "|"
            daily_expenses = daily_expenses + str(daily_total) + ","
        else:
            date_label += str(date)
            daily_expenses += str(daily_total)

    # a chart that we can display in the email (temporary?)
    line_chart = ('https://image-charts.com/chart?'
                  'chtt=Daily+Expenses+in+' + calendar.month_name[month] + '&'  # chart title
                  'cht=lxy&'  # chart type = line chart
                  'chs=350x250&'  # chart size
                  'chxt=x,y&'  # axis to display
                  'chxr=0,1,' + str(end) + '&'  # axis range
                  'chxl=0:|' + date_label + '&'  # custom x-axis label
                  'chd=t:' + date_label + '|' + daily_expenses)  # chart data

    categories = cc.get_category_expenses(year, month, True, user_id)["categories"]

    # calculate total_expense first to calculate category expense % later
    total_expense = 0
    for category in categories:
        total_expense += category["expense"]

    # calculate category expense % of total_expense
    chart_data = ""
    category_legend = ""
    expense_labels = ""
    for category in categories:
        percentage = category["expense"] / total_expense
        chart_data = chart_data + str(percentage) + ","
        category_legend = category_legend + category["category"] + "|"
        expense_labels = expense_labels + "$" + str(category["expense"]) + "|"

    doughnut_chart = ('https://image-charts.com/chart?'
                      'chtt=Total+Expenses+by+Category&'  # chart title
                      'cht=pd&'  # chart type = doughnut chart
                      'chs=600x250&'  # chart size
                      'chd=t:' + chart_data[:-1] + '&'  # chart data
                      'chdl=' + category_legend[:-1] + '&'  # chart legend (category names)
                      'chl=' + expense_labels[:-1] + '&'  # chart labels
                      'chli=$' + str(total_expense))  # chart inner label (total expense in all categories)

    # get the top three categories from categories list
    top_categories = categories[:3]

    message = Mail(
        from_email=TEST_EMAIL1,
        to_emails=user_email,
        subject='Your monthly expense overview')
    message.template_id = TemplateId("d-7c71f7ec22b64603bf546983725aa988")
    message.dynamic_template_data = {"month": calendar.month_name[month],
                                     "line_chart": line_chart,
                                     "doughnut_chart": doughnut_chart,
                                     "category": top_categories}
    try:
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        sg.send(message)
    except Exception:
        return jsonify({"Error": "Failed to send monthly overview"})
    return jsonify({"Success": "Monthly overview email sent"})


@emails.route('/forgot-password', methods=['POST'])
def forgot_password():
    body = json.loads(request.get_data())
    user_email = body["email"]

    try:
        # check if user email exists in database
        User.query.filter(User.email == user_email).first_or_404()
    except Exception:
        return jsonify({"Error": "Invalid email address"})

    password_reset_serializer = URLSafeTimedSerializer(SECRET_KEY)
    password_reset_url = ('http://localhost:3000/reset-password/' +
                          password_reset_serializer.dumps(user_email, salt='password-reset-salt'))

    message = Mail(
        from_email=TEST_EMAIL1,
        to_emails=user_email,
        subject='Reset your password',
        html_content='Link to reset password')
    message.template_id = TemplateId("d-582022551b084a2ba6e05b439ec5d1ee")
    message.dynamic_template_data = {"password_reset_url": password_reset_url}
    try:
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        sg.send(message)
    except Exception:
        return jsonify({"Error": "Failed to send reset password email"})
    return jsonify({"Success": "Reset password email sent"})


def welcome_email(user_email):
    message = Mail(
        from_email=TEST_EMAIL1,
        to_emails=user_email,
        subject='Welcome to Receipt Tracker')
    message.template_id = TemplateId("d-e41c2451bbcb4d3781cde06c0e915fd8")
    try:
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        sg.send(message)
    except Exception:
        return jsonify({"Error": "Failed to send welcome email"})
    return jsonify({"Success": "Welcome email sent"})
