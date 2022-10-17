from app.models import db, Comment

# Adds a demo user, you can add other users here if you want
def seed_comments():

    comment_1 = Comment(userId=1, imageId=1, body="Wow so cool")
    comment_2 = Comment(userId=2, imageId=1, body="I am the master of my universe")
    comment_3 = Comment(userId=1, imageId=1, body="Making this my wallpaper now")
    comment_4 = Comment(userId=3, imageId=1, body="Amazing Photo")
    comment_5 = Comment(userId=4, imageId=2, body="Taking this for my own")
    comment_6 = Comment(userId=2, imageId=2, body="This photo inspired me")
    comment_7 = Comment(userId=1, imageId=2, body="Where has this been all my life")
    comment_8 = Comment(userId=2, imageId=2, body="Woah~~~~~")
    comment_9 = Comment(userId=3, imageId=3, body="Insane picture! ")
    comment_10 = Comment(userId=4, imageId=3, body="Making this my wallpaper now")
    comment_11 = Comment(userId=2, imageId=3, body="Hello World")
    comment_12 = Comment(userId=1, imageId=4, body="WOWOWOWOWOWOW")
    comment_13 = Comment(userId=3, imageId=5, body="Cant believe i found this again!")
    comment_14 = Comment(userId=4, imageId=5, body="This was a horrible pic")
    comment_15 = Comment(userId=3, imageId=6, body="This made me so depressed")
    comment_16 = Comment(userId=2, imageId=7, body="This made me so happy")
    comment_17 = Comment(userId=1, imageId=5, body="I started rethinking about my marriage")
    comment_18 = Comment(userId=4, imageId=4, body="What about that! ")
    comment_19 = Comment(userId=2, imageId=8, body="I'm a bot")
    comment_20 = Comment(userId=1, imageId=2, body="Win Free Money Click Here Now!!!")

    comments = [comment_1, comment_2, comment_3, comment_4,comment_5,comment_6,comment_7,comment_8,comment_9,comment_10,comment_11,comment_12,comment_13,comment_14,comment_15,comment_16,comment_17,comment_18,comment_19,comment_20]

    for comment in comments:
        db.session.add(comment)
        db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
