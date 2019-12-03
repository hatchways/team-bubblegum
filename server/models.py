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
    date_created = db.Column(db.Date, default=date.today())
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    images = db.relationship('Image', backref='receipt')

    def __init__(self, amount, title, receipt_date, pic_url, category=None):
        self.amount = amount
        self.title = title
        self.category = category
        self.receipt_date = receipt_date
        self.date_created = date.today()

    def __repr__(self):
        # return f"Receipt {self.id}, Title: {self.title}" < having syntax error
        return 'Receipt %s, Title: %s' % (self.id, self.title)

    def to_dict(self):
        return {'id': self.id,
                'title': self.title,
                'amount': str(self.amount),
                'cateogory': self.category,
                'receipt_date': self.receipt_date,
                'pic_url': self.pic_url,
                'date_created': self.date_created,
                'user_id': self.user_id}

class Image(db.Model):
    __tablename__ = 'image'

    id = db.Column(db.Integer, primary_key=True)

    location = db.Column(db.String(200), nullable=False)
    receipt_id = db.Column(db.Integer, db.ForeignKey('receipt.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'location': self.url,
            'receipt_id': self.receipt_id
            'user_id': self.user_id
        }
