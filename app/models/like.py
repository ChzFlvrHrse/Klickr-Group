from .db import db, environment, SCHEMA, add_prefix_for_prod

class Like(db.Model):
    __tablename__ = 'likes'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    imageId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("images.id")), nullable=False)


    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'imageId': self.imageId,
        }
