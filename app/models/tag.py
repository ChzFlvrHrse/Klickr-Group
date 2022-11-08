from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod

class Tag(db.Model):
    __tablename__ = 'tags'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    imageId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("images.id")), nullable=False)
    body = db.Column(db.VARCHAR(100))
    # timestamps
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)


    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'imageId': self.imageId,
            'body': self.body,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
