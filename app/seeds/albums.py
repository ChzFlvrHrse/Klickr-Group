from app.models import Album, db



# Adds a demo user, you can add other users here if you want
def seed_albums():
    album_1 = Album(userId=1, title="Cool Shots", description="My photo album", previewImageUrl="https://images.unsplash.com/photo-1663875967691-15b02702931c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80")
    album_2 = Album(userId=2, title="Me in 2018", description="My photo album from 2018", previewImageUrl="https://images.unsplash.com/photo-1664700747100-756700090373?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80")
    album_3 = Album(userId=3, title="Highlights", description="My favorite moments", previewImageUrl="https://images.unsplash.com/photo-1663187114582-5cfcbdac5481?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80")
    album_4 = Album(userId=4, title="My Photos", description="All my photos", previewImageUrl="https://images.unsplash.com/photo-1606667788845-5dbd000041f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1555&q=80")
    album_5 = Album(userId=5, title="Images I Like", description="Coolest images I could find", previewImageUrl="https://images.unsplash.com/photo-1665916712273-d5d74843683b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80")
    album_6 = Album(userId=6, title="Greatest Hits", description="Photos I found cool", previewImageUrl="https://images.unsplash.com/photo-1503249023995-51b0f3778ccf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=660&q=80")
    album_7 = Album(userId=7, title="Nice Pics", description="Thought-provoking pictures", previewImageUrl="https://images.unsplash.com/photo-1548133650-7e2b96ebe5e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=681&q=80")
    album_8 = Album(userId=8, title="My Album", description="My album", previewImageUrl="https://images.unsplash.com/photo-1626847037657-fd3622613ce3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80")
    album_9 = Album(userId=9, title="Captures", description="My pics", previewImageUrl="https://images.unsplash.com/photo-1496449903678-68ddcb189a24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80")
    album_10 = Album(userId=10, title="Photos", description="Cool images", previewImageUrl="https://images.unsplash.com/photo-1494633114655-819eb91fde40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80")
    album_11 = Album(userId=11, title="Winter Collection", description="Winter photos", previewImageUrl="https://images.unsplash.com/photo-1611124600582-c9ef0e977585?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80")
    album_12 = Album(userId=12, title="Halloween Photos", description="Spooky photos", previewImageUrl="https://images.unsplash.com/photo-1541877057445-c90b478d53d5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80")
    album_13 = Album(userId=13, title="Cool Concepts", description="Cool cyberpunk images", previewImageUrl="https://images.unsplash.com/photo-1580428180098-24b353d7e9d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80")
    album_14 = Album(userId=14, title="Futuristic Photos", description="Really cool images", previewImageUrl="https://images.unsplash.com/photo-1599790772272-d1425cd3242e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80")

    albums = [album_1, album_2, album_3, album_4, album_5, album_6, album_7,album_8,album_9,album_10,album_11,album_12,album_13,album_14]
    for album in albums:
        db.session.add(album)
        db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_albums():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()
