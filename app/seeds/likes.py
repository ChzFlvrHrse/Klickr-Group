from app.models import db, Like

def seed_likes():
    like_1 = Like(userId=1, imageId=1)
    like_2 = Like(userId=4, imageId=2)
    like_3 = Like(userId=2, imageId=3)
    like_4 = Like(userId=3, imageId=4)
    like_5 = Like(userId=1, imageId=5)
    like_6 = Like(userId=2, imageId=6)
    like_7 = Like(userId=3, imageId=7)
    like_8 = Like(userId=4, imageId=8)
    like_9 = Like(userId=1, imageId=9)
    like_10 = Like(userId=2, imageId=10)
    like_11 = Like(userId=3, imageId=11)
    like_12 = Like(userId=4, imageId=12)
    like_13 = Like(userId=5, imageId=13)
    like_14 = Like(userId=1, imageId=14)
    like_15 = Like(userId=2, imageId=15)
    like_16 = Like(userId=3, imageId=16)
    

    likes = [like_1, like_2, like_3, like_4,like_5,like_6,like_7,like_8,like_9,like_10,like_11,like_12,like_13,like_14,like_15,like_16]

    for like in likes:
        db.session.add(like)
        db.session.commit()


def undo_likes():
    db.session.execute('TRUNCATE likes RESTART IDENTITY CASCADE;')
    db.session.commit()
