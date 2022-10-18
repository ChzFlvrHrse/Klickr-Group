from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password')
    jb = User(
        username='jeebz', email='jb@aa.io', password='password')

    dc = User(
        username='DanielCheong', email='DanielCheong@aa.io', password='password')
    pr = User(
        username='PeteRowbottom', email='PeteRowbottom@aa.io', password='password')
    jgl = User(
        username='JorgeGuadalupeLizarrága', email='JorgeGuadalupeLizarrága@aa.io', password='password')
    ff = User(
        username='FabianFortmann', email='FabianFortmann@aa.io', password='password')
    ag = User(
        username='AdamGibbs', email='AdamGibbs@aa.io', password='password')
    ja = User(
        username='JunjiAoyama', email='JunjiAoyama@aa.io', password='password')
    jbm = User(
        username='JosBuurmans', email='JosBuurmans@aa.io', password='password')
    cf = User(
        username='ChristophFischer', email='ChristophFischer@aa.io', password='password')
    pa = User(
        username='PeterArn', email='PeterArn@aa.io', password='password')
    sm = User(
        username='SkyMatthews', email='SkyMatthews@aa.io', password='password')


    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(jb)
    db.session.add(dc)
    db.session.add(pr)
    db.session.add(jgl)
    db.session.add(ff)
    db.session.add(ag)
    db.session.add(ja)
    db.session.add(jbm)
    db.session.add(cf)
    db.session.add(pa)
    db.session.add(sm)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
