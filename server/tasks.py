from app import celery
from celery.schedules import crontab
from datetime import datetime, timedelta
from models import *
from api import receipt_controller
from sqlalchemy import extract

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

celery.conf.beat_schedule = {
    "generate-file-task": {
        "task": "tasks.generate_file",
        "schedule": crontab(day_of_month=1)
    }
}
