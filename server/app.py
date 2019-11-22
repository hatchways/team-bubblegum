from flask import Flask, request, redirect, url_for, render_template
from flask_sqlalchemy import SQLAlchemy
from api.ping_handler import ping_handler
from api.home_handler import home_handler
from config import DB_USERNAME, DB_PASSWORD, DB_NAME
from flask_bcrypt import Bcrypt
from email_validator import validate_email
import jwt

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://{}:{}@localhost/{}'.format(DB_USERNAME, DB_PASSWORD, DB_NAME)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'bubblegum'
db= SQLAlchemy(app)
bcrypt = Bcrypt(app)

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

@app.route('/')
def index(): 
  myUser = User.query.all()
  singleUser = User.query.filter_by(email='test1@test.com').first()
  if(singleUser):
    pw_hash = singleUser.password
    isTrue = bcrypt.check_password_hash(pw_hash,'134')
    print(isTrue)
    
  return render_template('add_user.html', myUser=myUser, singleUser=singleUser)

@app.route('/signup', methods=['POST'])
def signup():
  print('-----', request.form['password'], '-----')
  if validate_email(request.form['email']) == False:
    return 'Please enter a valid email'
  if len(request.form['password']) < 6:
    return 'Password must be 6 letters or more'
  user = User(request.form['email'], request.form['password'])
  db.session.add(user)
  db.session.commit()

  token = jwt.encode({'email': request.form['email']})
  print(token)
  return redirect(url_for('index'))
  
@app.route('/login', methods=['GET', 'POST'])
def login():
  if request.method == 'POST':
    find_user = User.query.filter_by(email=request.form['email']).first()
    if find_user:
      is_authenticated = bcrypt.check_password_hash(find_user.password, request.form['password'])
      if is_authenticated:
        token = jwt.encode({'email': find_user.email}, app.config['SECRET_KEY'])
        print(token)
        return redirect(url_for('home'))
      else:
        return 'Invalid credentials'
    else: 
      return 'Invlaid credentials'
  return render_template('login_user.html')

@app.route('/home')
def home():
  return render_template('user_home.html')  

app.register_blueprint(home_handler)
app.register_blueprint(ping_handler)

