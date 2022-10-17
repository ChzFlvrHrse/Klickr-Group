from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    # first_name = db.Column(db.VARCHAR(25), nullable=False)
    # last_name = db.Column(db.VARCHAR(25), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    # password = db.Column(db.VARCHAR(25), nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)

    # one-to-many; user has many images
    images = db.relationship('Image', backref='user', cascade="all, delete-orphan")
    comments = db.relationship("Comment", backref='user', cascade="all, delete-orphan")
    likes = db.relationship("Like", backref='user', cascade="all, delete-orphan")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }
