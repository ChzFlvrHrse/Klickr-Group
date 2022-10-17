from app.models import Image, db



# Adds a demo user, you can add other users here if you want
def seed_images():
    image_1 = Image(userId=1, title="App Mountain", description="Best view in the mountain ranges", previewImageUrl="https://images.unsplash.com/photo-1663875967691-15b02702931c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80")
    image_2 = Image(userId=2, title="NY Building Tower", description="MultiLayered building was awesome", previewImageUrl="https://images.unsplash.com/photo-1664700747100-756700090373?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80")
    image_3 = Image(userId=1, title="Solar System", description="Took this at the perfect moment", previewImageUrl="https://images.unsplash.com/photo-1663187114582-5cfcbdac5481?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80")
    image_4 = Image(userId=3, title="Rainbow Shot", description="Beautiful Rainbow shot", previewImageUrl="https://images.unsplash.com/photo-1606667788845-5dbd000041f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1555&q=80")
    image_5 = Image(userId=2, title="Florida Dock", description="Dock was beautiful", previewImageUrl="https://images.unsplash.com/photo-1665916712273-d5d74843683b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80")
    image_6 = Image(userId=4, title="Empowerment", description="Standing up for whats right", previewImageUrl="https://images.unsplash.com/photo-1503249023995-51b0f3778ccf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=660&q=80")
    image_7 = Image(userId=3, title="Inception", description="Nothing is as it's percieved", previewImageUrl="https://images.unsplash.com/photo-1548133650-7e2b96ebe5e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=681&q=80")
    image_8 = Image(userId=4, title="Audi A7", description="Luxury unleashed", previewImageUrl="https://images.unsplash.com/photo-1626847037657-fd3622613ce3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80")
    image_9 = Image(userId=2, title="Visionary Sign", description="This is the sign you've been looking for", previewImageUrl="https://images.unsplash.com/photo-1496449903678-68ddcb189a24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80")
    image_10 = Image(userId=3, title="Dreams", description="Dreams are made to be reality", previewImageUrl="https://images.unsplash.com/photo-1494633114655-819eb91fde40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80")
    image_11 = Image(userId=2, title="Snowboard", description="Go Big or Go Home", previewImageUrl="https://images.unsplash.com/photo-1611124600582-c9ef0e977585?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80")
    image_12 = Image(userId=2, title="Haloween", description="Spooky Vibes", previewImageUrl="https://images.unsplash.com/photo-1541877057445-c90b478d53d5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80")
    image_13 = Image(userId=3, title="CyberPunk", description="Futurism", previewImageUrl="https://images.unsplash.com/photo-1580428180098-24b353d7e9d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80")
    image_14 = Image(userId=4, title="RoboWisdom", description="Connecting to the future", previewImageUrl="https://images.unsplash.com/photo-1599790772272-d1425cd3242e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80")
    image_15 = Image(userId=1, title="Anime", description="Anime Vibes", previewImageUrl="https://images.unsplash.com/photo-1586461715699-1e192dcd04c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=419&q=80")
    image_16 = Image(userId=1, title="Desert Palace", description="MiddleEast", previewImageUrl="https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80")

    images = [image_1, image_2, image_3, image_4, image_5, image_6, image_7,image_8,image_9,image_10,image_11,image_12,image_13,image_14,image_15, image_16]
    for image in images:
        db.session.add(image)
        db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()
