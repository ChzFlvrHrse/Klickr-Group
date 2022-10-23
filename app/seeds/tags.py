from app.models import db, Tag

# Adds a demo user, you can add other users here if you want
def seed_tags():

    tag_1 = Tag(userId=1, imageId=1, body="Scenic")
    tag_2 = Tag(userId=1, imageId=1, body="Nature")
    tag_3 = Tag(userId=1, imageId=1, body="Mountain")
    tag_4 = Tag(userId=1, imageId=1, body="Cool")
    tag_5 = Tag(userId=2, imageId=2, body="Architecture")
    tag_6 = Tag(userId=2, imageId=2, body="Building")
    tag_7 = Tag(userId=2, imageId=2, body="City")
    tag_8 = Tag(userId=2, imageId=2, body="Man-made")
    tag_9 = Tag(userId=1, imageId=3, body="Space")
    tag_10 = Tag(userId=1, imageId=3, body="Outer space")
    tag_11 = Tag(userId=1, imageId=3, body="Stars")
    tag_12 = Tag(userId=3, imageId=4, body="Nature")
    tag_13 = Tag(userId=2, imageId=5, body="Dock")
    tag_14 = Tag(userId=2, imageId=5, body="Boats")
    tag_15 = Tag(userId=4, imageId=6, body="Rebel")
    tag_16 = Tag(userId=3, imageId=7, body="Perspective")
    tag_17 = Tag(userId=2, imageId=5, body="Ocean")
    tag_18 = Tag(userId=3, imageId=4, body="Rainbow")
    tag_19 = Tag(userId=4, imageId=8, body="Cars")
    tag_20 = Tag(userId=2, imageId=2, body="High-rise")
    tag_21 = Tag(userId=2, imageId=9, body="Vision")
    tag_22 = Tag(userId=3, imageId=10, body="Dream")
    tag_23 = Tag(userId=2, imageId=11, body="Snowboard")
    tag_24 = Tag(userId=2, imageId=12, body="Pumpkin")
    tag_25 = Tag(userId=3, imageId=13, body="Futuristic")
    tag_26 = Tag(userId=4, imageId=14, body="Futuristic")
    tag_27 = Tag(userId=1, imageId=15, body="Rebel")
    tag_28 = Tag(userId=1, imageId=16, body="Architecture")
    tag_29 = Tag(userId=5, imageId=17, body="Boats")
    tag_30 = Tag(userId=6, imageId=18, body="Nature")
    tag_31 = Tag(userId=7, imageId=19, body="Cars")
    tag_32 = Tag(userId=8, imageId=20, body="Mountain")
    tag_33 = Tag(userId=9, imageId=21, body="Nature")
    tag_34 = Tag(userId=10, imageId=22, body="Ocean")
    tag_35 = Tag(userId=11, imageId=23, body="Nature")
    tag_36 = Tag(userId=12, imageId=24, body="Nature")
    tag_37 = Tag(userId=13, imageId=25, body="Building")
    tag_38 = Tag(userId=14, imageId=25, body="Nature")
    tag_39 = Tag(userId=5, imageId=17, body="Port")
    tag_40 = Tag(userId=6, imageId=18, body="Scenic")
    tag_41 = Tag(userId=7, imageId=19, body="Racing")
    tag_42 = Tag(userId=8, imageId=20, body="Nature")
    tag_43 = Tag(userId=9, imageId=21, body="Scenic")
    tag_44 = Tag(userId=10, imageId=22, body="Waves")
    tag_45 = Tag(userId=11, imageId=23, body="Fog")
    tag_46 = Tag(userId=12, imageId=24, body="Landscape")
    tag_47 = Tag(userId=13, imageId=25, body="Monochrome")
    tag_48 = Tag(userId=14, imageId=25, body="Work")
    tag_49 = Tag(userId=5, imageId=17, body="Night")
    tag_50 = Tag(userId=6, imageId=18, body="Lush")



    tags = [tag_1, tag_2, tag_3, tag_4,tag_5,tag_6,tag_7,tag_8,tag_9,tag_10,tag_11,tag_12,tag_13,tag_14,tag_15,tag_16,tag_17,tag_18,tag_19,tag_20,tag_21,tag_22,tag_23,tag_24,tag_25,tag_26,tag_27,tag_28,tag_29,tag_30,tag_31,tag_32,tag_33,tag_34,tag_35,tag_36,tag_37, tag_38, tag_39,tag_40,tag_41,tag_42,tag_43,tag_44,tag_45,tag_46,tag_47,tag_48,tag_49,tag_50]

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
