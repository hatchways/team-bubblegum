from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from datetime import date

db = SQLAlchemy()
bcrypt = Bcrypt()

class User(db.Model):
  __tablename__ = 'user'

  id = db.Column(db.Integer, primary_key=True)
  email = db.Column(db.String(120), unique=True, nullable=False)
  password = db.Column(db.String(200), nullable=False)

  def __init__(self, email, password):
    self.email = email
    self.password = bcrypt.generate_password_hash(password).decode('utf-8')

  def __repr__(self):
    return '<User %r>' % self.email

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
        # return f"Receipt {self.id}, Title: {self.title}" < having syntax error
        return 'Receipt %s, Title: %s' % (self.id, self.title)

    def to_dict(self):
        return {'id': self.id,
                'title': self.title,
                'amount': str(self.amount),
                'category': self.category,
                'receipt_date': self.receipt_date,
                'pic_url': self.pic_url,
                'date_created': self.date_created,
                'user_id': self.user_id}
