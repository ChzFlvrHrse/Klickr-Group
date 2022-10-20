from app.models import db, Tag

# Adds a demo user, you can add other users here if you want
def seed_tags():

    tag_1 = Tag(userId=1, imageId=1, body="Wow so cool")
    tag_2 = Tag(userId=2, imageId=1, body="I am the master of my universe")
    tag_3 = Tag(userId=1, imageId=1, body="Making this my wallpaper now")
    tag_4 = Tag(userId=3, imageId=1, body="Amazing Photo")
    tag_5 = Tag(userId=4, imageId=2, body="Taking this for my own")
    tag_6 = Tag(userId=2, imageId=2, body="This photo inspired me")
    tag_7 = Tag(userId=1, imageId=2, body="Where has this been all my life")
    tag_8 = Tag(userId=2, imageId=2, body="Woah~~~~~")
    tag_9 = Tag(userId=3, imageId=3, body="Insane picture! ")
    tag_10 = Tag(userId=4, imageId=3, body="Making this my wallpaper now")
    tag_11 = Tag(userId=2, imageId=3, body="Hello World")
    tag_12 = Tag(userId=1, imageId=4, body="WOWOWOWOWOWOW")
    tag_13 = Tag(userId=3, imageId=5, body="Cant believe i found this again!")
    tag_14 = Tag(userId=4, imageId=5, body="This was a horrible pic")
    tag_15 = Tag(userId=3, imageId=6, body="This made me so depressed")
    tag_16 = Tag(userId=2, imageId=7, body="This made me so happy")
    tag_17 = Tag(userId=1, imageId=5, body="I started rethinking about my marriage")
    tag_18 = Tag(userId=4, imageId=4, body="What about that! ")
    tag_19 = Tag(userId=2, imageId=8, body="I'm a bot")
    tag_20 = Tag(userId=1, imageId=2, body="Win Free Money Click Here Now!!!")

    tags = [tag_1, tag_2, tag_3, tag_4,tag_5,tag_6,tag_7,tag_8,tag_9,tag_10,tag_11,tag_12,tag_13,tag_14,tag_15,tag_16,tag_17,tag_18,tag_19,tag_20]

    for tag in tags:
        db.session.add(tag)
        db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_tags():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
