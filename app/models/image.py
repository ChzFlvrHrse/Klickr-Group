from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod


class Image(db.Model):
    __tablename__ = 'images'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    albumId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("albums.id")), nullable=False)
    title = db.Column(db.VARCHAR(100), nullable=False)
    description = db.Column(db.VARCHAR(1000))
    previewImageUrl = db.Column(db.String, nullable=False)

    comments = db.relationship("Comment", backref='image', cascade="all, delete-orphan")
    likes = db.relationship("Like", backref='image', cascade="all, delete-orphan")
    tags = db.relationship("Tag", backref='image', cascade="all, delete-orphan")
    # timestamps
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)


    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'albumId':self.albumId,
            'title': self.title,
            'description': self.description,
            'previewImageUrl': self.previewImageUrl,
            # timestamps
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'comments': [comment.to_dict() for comment in self.comments],
            'likes': [like.to_dict() for like in self.likes],
            'tags': [tag.to_dict() for tag in self.tags]

        }
