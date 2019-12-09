from app import celery, app
from celery.schedules import crontab
from datetime import datetime, timedelta
from models import *
from api import receipt_controller
from sqlalchemy import extract
from config import SENDGRID_API_KEY
from sendgrid import SendGridAPIClient
import base64
from sendgrid.helpers.mail import (Mail, Attachment, FileContent, FileName, FileType, Disposition, ContentId)
import csv


@celery.task
def generate_file():
    with app.app_context():
        users = User.query.all()
        day_before = datetime.now() - timedelta(days=1)
        for user in users:
            user_receipts = Receipt.query.filter(User.id == user.id).filter(extract('year', Receipt.purchase_date) == day_before.year).filter(extract('month', Receipt.purchase_date) == day_before.month).all()
            with open('monthly-report.csv', 'w') as csvfile:
                writer = csv.writer(csvfile)
                for receipt in user_receipts:
                    row = [receipt.title, receipt.amount, receipt.category, receipt.receipt_date]
                    writer.writerow(row)
            # EMAIL USERS WITH MONTHLY REPORT CSV FILE HERE
            message = Mail(
                from_email='',
                to_emails=user.email,
                subject='Your monthly expense overview',
                html_content='Monthly expense overview here')
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
                return jsonify({"Success": "Email has been sent"})
            except Exception as e:
                return jsonify({"Error": "Failed to send email"})

celery.conf.beat_schedule = {
    "generate-file-task": {
        "task": "tasks.generate_file",
        "schedule": crontab(day_of_month=1)
    }
}
