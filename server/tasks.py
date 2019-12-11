from app import celery, app
from celery.schedules import crontab
from datetime import datetime, timedelta
from models import *
import api.receipt_controller as rc
import api.category_controller as cc
from sqlalchemy import extract
from config import SENDGRID_API_KEY, TEST_EMAIL1
from sendgrid import SendGridAPIClient
import csv, calender, base64
from sendgrid.helpers.mail import (Mail, TemplateId, Attachment, FileContent, FileName, FileType, Disposition, ContentId)
import datetime as dt


@celery.task
def generate_file():
    with app.app_context():
        users = User.query.all()
        day_before = datetime.now() - timedelta(days=1)
        for user in users:
            user_receipts = Receipt.query.filter_by(user_id=user.id).filter(extract('year', Receipt.receipt_date) == day_before.year).filter(extract('month', Receipt.receipt_date) == day_before.month).all()
            with open('monthly-report.csv', 'w') as csvfile:
                writer = csv.writer(csvfile)
                for receipt in user_receipts:
                    row = [receipt.title, receipt.amount, receipt.category, receipt.receipt_date]
                    writer.writerow(row)
            # EMAIL USERS WITH MONTHLY REPORT CSV FILE HERE
            year = day_before.year
            month = day_before.month

            # calculate daily expense total
            end = calendar.monthrange(year, month)[1]
            date_label = ""
            daily_expenses = ""
            for date in range(1, end + 1):
                start_date = dt.date(year, month, date)
                end_date = dt.date(year, month, date)
                receipts = rc.get_receipts_from_database(user.id, start_date, end_date)
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
                        'chxr=0,1,' + end + '&'  # axis range
                        'chxl=0:|' + date_label + '&'  # custom x-axis label
                        'chd=t:' + date_label + '|' + daily_expenses)  # chart data

            categories = cc.get_category_expenses(year, month, True, user.id)["categories"]

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
                to_emails=user.email,
                subject='Your monthly expense overview')
            message.template_id = TemplateId("d-7c71f7ec22b64603bf546983725aa988")
            message.dynamic_template_data = {"month": calendar.month_name[month],
                                            "line_chart": line_chart,
                                            "doughnut_chart": doughnut_chart,
                                            "category": top_categories}
            with open('monthly-report.csv', 'rb') as csvfile:
                data = csvfile.read()
            encoded = base64.b64encode(data).decode()
            attachment = Attachment()
            attachment.file_content = FileContent(encoded)
            attachment.file_type = FileType('text/csv')
            attachment.file_name = FileName('monthly-report.csv')
            attachment.disposition = Disposition('attachment')
            attachment.content_id = ContentId('monthly-report-id')
            message.attachment = attachment
            try:
                sg = SendGridAPIClient(SENDGRID_API_KEY)
                sg.send(message)
            except Exception as e:
                return jsonify({"Error": "Failed to send monthly overview"})
            return jsonify({"Success": "Email sent"})

celery.conf.beat_schedule = {
    "generate-file-task": {
        "task": "tasks.generate_file",
        "schedule": crontab(day_of_month=1)
    }
}
