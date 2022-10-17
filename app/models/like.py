from .db import db

class Like(db.Model):
    __tablename__ = 'likes'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    imageId = db.Column(db.Integer, db.ForeignKey("images.id"), nullable=False)


    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'imageId': self.imageId,
        }
