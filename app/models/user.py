from email.policy import default
from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime



class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.VARCHAR(25), nullable=False)
    last_name = db.Column(db.VARCHAR(25), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    previewImageUrl = db.Column(db.String, nullable=False, default="https://creazilla-store.fra1.digitaloceanspaces.com/emojis/55737/grinning-face-with-big-eyes-emoji-clipart-xl.png")
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    hashed_password = db.Column(db.String(255), nullable=False)

    # one-to-many; user has many images
    images = db.relationship('Image', backref='user', cascade="all, delete-orphan")
    comments = db.relationship("Comment", backref='user', cascade="all, delete-orphan")
    likes = db.relationship("Like", backref='user', cascade="all, delete-orphan")
    tags = db.relationship("Tag", backref='user', cascade="all, delete-orphan")

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
            'first_name': self.first_name,
            'last_name': self.last_name,
            'username': self.username,
            'email': self.email,
            'previewImageUrl': self.previewImageUrl,
            'created_at': self.created_at,
        }
