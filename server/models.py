from flask_sqlalchemy import SQLAlchemy
from datetime import date
from app import bcrypt

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    receipts = db.relationship('Receipt', backref='user')
    images = db.relationship('Image', backref='user')

    def __init__(self, email, password):
        self.email = email
        self.password = bcrypt.generate_password_hash(password).decode('utf-8')

    def __repr__(self):
        return '<User %r>' % self.email
  
    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'password': self.password,
            'receipts': [receipt.to_dict() for receipt in self.receipts],
            'images': [image.to_dict() for image in self.images]
        }

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

    def __init__(self, amount, title, receipt_date, user_id, category=None):
        self.amount = amount
        self.title = title
        self.category = category
        self.receipt_date = receipt_date
        self.date_created = date.today()
        self.user_id = user_id

    def __repr__(self):
        # return f"Receipt {self.id}, Title: {self.title}" < having syntax error
        return 'Receipt %s, Title: %s' % (self.id, self.title)

    def to_dict(self):
        return {'id': self.id,
                'title': self.title,
                'amount': str(self.amount),
                'category': self.category,
                'receipt_date': self.receipt_date,
                'date_created': self.date_created,
                'user_id': self.user_id,
                'images': [image.to_dict() for image in self.images]}


class Image(db.Model):
    __tablename__ = 'image'

    id = db.Column(db.Integer, primary_key=True)

    location = db.Column(db.String(200), nullable=False)
    receipt_id = db.Column(db.Integer, db.ForeignKey('receipt.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'location': self.location,
            'receipt_id': self.receipt_id,
            'user_id': self.user_id
        }
