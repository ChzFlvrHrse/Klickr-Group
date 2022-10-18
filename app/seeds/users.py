from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='DemoUser', first_name='Demo', last_name='User', email='demo@aa.io', previewImageUrl="https://e7.pngegg.com/pngimages/978/397/png-clipart-adelie-penguin-bird-antarctica-emperor-penguin-penguin-animals-animal.png", password='password')
    marnie = User(
        username='MarnieB', first_name='Marnie', last_name='Bay', email='marnie@aa.io', previewImageUrl="https://pngimg.com/uploads/owl/owl_PNG2.png", password='password')
    bobbie = User(
        username='BobbieK', first_name='Bobbie', last_name='Kohl', email='bobbie@aa.io', previewImageUrl="https://www.pngall.com/wp-content/uploads/5/Black-Dog-PNG.png", password='password')
    jb = User(
        username='Jeebz', first_name='JB', last_name='Kam', email='jb@aa.io', previewImageUrl="https://e7.pngegg.com/pngimages/471/1009/png-clipart-lion-graphy-lion-mammal-animals.png", password='password')

    dc = User(
        username='DanielCheong', first_name='Daniel', last_name='Cheong', email='DanielCheong@aa.io', previewImageUrl="https://i.pinimg.com/originals/dd/e1/af/dde1af87cd468186def4eb68f899f13a.png", password='password')
    pr = User(
        username='PeteRowbottom',first_name='Pete', last_name='Rowbottom', email='PeteRowbottom@aa.io', previewImageUrl="https://i.pinimg.com/originals/cd/de/69/cdde693cbccc4821f0636f1900ebf5d7.png", password='password')
    jgl = User(
        username='JorgeGuadalupeLizarrága', first_name='Jorge', last_name='Guadalupe-Lizarrága', email='JorgeGuadalupeLizarrága@aa.io', previewImageUrl="https://w7.pngwing.com/pngs/725/70/png-transparent-zebra-zebra-horse-white-mammal-thumbnail.png", password='password')
    ff = User(
        username='FabianFortmann', first_name='Fabian', last_name='Fortmann', email='FabianFortmann@aa.io', previewImageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Baseball_%28crop%29_transparent.png/800px-Baseball_%28crop%29_transparent.png", password='password')
    ag = User(
        username='AdamGibbs', first_name='Adam', last_name='Gibbs', email='AdamGibbs@aa.io', previewImageUrl="https://www.kindpng.com/picc/m/34-344393_daffy-duck-png-transparent-png.png", password='password')
    ja = User(
        username='JunjiAoyama', first_name='Junji', last_name='Aoyama', email='JunjiAoyama@aa.io', previewImageUrl="https://i.pinimg.com/736x/0a/19/85/0a1985c684739b55f851ea877a93f35e.jpg", password='password')
    jbm = User(
        username='JosBuurmans', first_name='Jos', last_name='Buurmans', email='JosBuurmans@aa.io', previewImageUrl="https://i.pinimg.com/originals/5c/9f/71/5c9f71b2e196ccf71e72eb88b9f75be8.png", password='password')
    cf = User(
        username='ChristophFischer', first_name='Christoph', last_name='Fischer', email='ChristophFischer@aa.io', previewImageUrl="https://oyster.ignimgs.com/mediawiki/apis.ign.com/pokemon-legends/9/99/Cyndaquil.png", password='password')
    pa = User(
        username='PeterArn', first_name='Peter', last_name='Arn', email='PeterArn@aa.io', previewImageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Earth_Western_Hemisphere_transparent_background.png/1024px-Earth_Western_Hemisphere_transparent_background.png", password='password')
    sm = User(
        username='SkyMatthews', first_name='Sky', last_name='Matthews', email='SkyMatthews@aa.io', previewImageUrl="https://www.kindpng.com/picc/m/326-3267162_apex-legends-octane-apex-legends-octane-png-transparent.png", password='password')


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
