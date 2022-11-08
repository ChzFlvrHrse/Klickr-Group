from flask.cli import AppGroup
from .users import seed_users, undo_users
from .images import seed_images, undo_images
from .comments import seed_comments, undo_comments
from .likes import seed_likes, undo_likes
from .tags import seed_tags, undo_tags
from .albums import seed_albums, undo_albums

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding, truncate all tables prefixed with schema name
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
        # Add a truncate command here for every table that will be seeded.
        db.session.commit()
    seed_users()
    seed_albums()
    seed_images()
    seed_comments()
    seed_likes()
    seed_tags()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_images()
    undo_comments()
    undo_likes()
    undo_tags()
    undo_albums()
    # Add other undo functions here
