from flask_sqlalchemy import SQLAlchemy
from datetime import date

db = SQLAlchemy()


class Receipt(db.Model):
    __tablename__ = 'receipt'

    id = db.Column(db.Integer, primary_key=True)

    amount = db.Column(db.Numeric(12, 2), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String)
    receipt_date = db.Column(db.Date, nullable=False)
    pic_url = db.Column(db.String, nullable=False)
    date_created = db.Column(db.Date, default=date.today())
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __init__(self, amount, title, receipt_date, pic_url, category=None):
        self.amount = amount
        self.title = title
        self.category = category
        self.receipt_date = receipt_date
        self.pic_url = pic_url
        self.date_created = date.today()

    def __repr__(self):
        return f"Receipt {self.id}, Title: {self.title}"

    def to_dict(self):
        return {'id': self.id,
                'title': self.title,
                'amount': self.amount,
                'cateogory': self.category,
                'receipt_date': self.receipt_date,
                'pic_url': self.pic_url,
                'date_created': self.date_created,
                'user_id': self.user_id}
