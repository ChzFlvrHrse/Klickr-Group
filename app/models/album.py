from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod


class Album(db.Model):
    __tablename__ = 'albums'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    title = db.Column(db.VARCHAR(100), nullable=False)
    description = db.Column(db.VARCHAR(1000))
    previewImageUrl = db.Column(db.String, nullable=False)

    images = db.relationship('Image', backref='album', cascade="all, delete-orphan")
    # timestamps
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)


    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'title': self.title,
            'description': self.description,
            'previewImageUrl': self.previewImageUrl,
            # timestamps
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'images': [image.to_dict() for image in self.images]
        }
