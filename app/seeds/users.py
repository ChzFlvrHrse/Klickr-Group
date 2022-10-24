from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='DemoUser', first_name='Demo', last_name='User', email='demo@aa.io', previewImageUrl="https://combo.staticflickr.com/pw/images/buddyicon02_r.png#1008738@N20", password='password')
    marnie = User(
        username='MadMaggie', first_name='Mad', last_name='Maggie', email='maggie@gmail.com', previewImageUrl="https://bleedingcool.com/wp-content/uploads/2022/01/Mad-Maggie-Apex-Lagends-900x900.jpg", password='password1')
    bobbie = User(
        username='LuffyD', first_name='Luffy', last_name='Monkey D', email='luffy@gmail.com', previewImageUrl="https://i.pinimg.com/originals/5e/3a/a5/5e3aa558b3b5211cdf676605c8023805.png", password='password')
    jb = User(
        username='SasukeUch', first_name='Sasuke', last_name='Uchiha', email='sasuke@gmail.com', previewImageUrl="https://2.bp.blogspot.com/-ygcEFx9BXd0/V5zpONow77I/AAAAAAAAHMk/U4o5N9fDeTcNXf4cd50BsHcZl1W5PnqfQCLcB/s1600/3982895-0948645287-Sasuk.jpg", password='password2')

    dc = User(
        username='JB', first_name='Jeebz', last_name='Kam', email='JB@gmail.com', previewImageUrl="https://pbs.twimg.com/profile_images/1564953421488193537/9b7QYNGg_400x400.jpg", password='password3')
    pr = User(
        username='Raphael',first_name='Raphael', last_name='Yohannes', email='raphael@gmail.com', previewImageUrl="https://i.pinimg.com/originals/53/85/cf/5385cfbaf56eb8d374606aefce52d281.jpg", password='passwor4')
    jgl = User(
        username='JohnWick', first_name='John', last_name='Wick', email='babayaga@gmail.com', previewImageUrl="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2022%2F07%2F15%2FKeanu-Reeves-John-Wick-071522-2.jpg", password='password5')
    ff = User(
        username='Pho', first_name='Pho', last_name='Tai', email='pho@gmail.com', previewImageUrl="https://phosangs.com/wp-content/uploads/2020/10/sangspho-1-1030x687.jpg", password='password6')
    ag = User(
        username='Charizard', first_name='Charizard', last_name='Pokemon', email='charizard@gmail.com', previewImageUrl="https://fictionhorizon.com/wp-content/uploads/2020/08/Leon_Charizard.jpg", password='password7')
    ja = User(
        username='Zelda', first_name='Legend of', last_name='Zelda', email='zelda@gmail.com', previewImageUrl="https://i.pinimg.com/originals/b8/e0/3c/b8e03c82faf317eec2ad0e1e4802d082.jpg", password='password8')
    jbm = User(
        username='JohnLee', first_name='John', last_name='Lee', email='johnlee@gmail.com', previewImageUrl="https://i1.sndcdn.com/artworks-ywcx1pUzUGGvjwmH-BUNWRA-t500x500.jpg", password='password9')
    cf = User(
        username='Soap', first_name='John', last_name='Mactavish', email='soap@gmail.com', previewImageUrl="https://i5.walmartimages.com/asr/0449934a-07d8-4077-8083-a4030fe004dc_1.3e5c8b2c4f75792583915b786af0e12c.jpeg", password='password10')
    pa = User(
        username='LarryLobster', first_name='Larry', last_name='Lobster', email='larry@gmail.com', previewImageUrl="https://thespongeclub.com/wp-content/uploads/2022/07/Larry-the-Lobster-Guide.png", password='password11')
    sm = User(
        username='Batman', first_name='Bruce', last_name='Wayne', email='batman@aa.io', previewImageUrl="https://prd-rteditorial.s3.us-west-2.amazonaws.com/wp-content/uploads/2022/02/28152755/Batman_First_Reviews1.jpg", password='password12')


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
