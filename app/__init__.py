import os

from flask import Flask, redirect, render_template, request, session
from flask_cors import CORS
from flask_login import LoginManager
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf

from app.models import comment

from .models import db, User
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.explore_route import explore_route
from .api.image_routes import image_routes
from .api.likes_routes import Likes_routes
from .api.comments_routes import Comments_routes
from .api.tags_routes import Tags_routes
from .api.album_routes import album_routes


from .seeds import seed_commands

from .config import Config
from .models import User, db
from .seeds import seed_commands

app = Flask(__name__, static_folder='../react-app/build', static_url_path='/')

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
# likes
app.register_blueprint(Likes_routes, url_prefix='/api/likes')
# comments
app.register_blueprint(Comments_routes, url_prefix='/api/comments')
# images
app.register_blueprint(explore_route, url_prefix='/api/explore')
app.register_blueprint(image_routes, url_prefix="/api/images")
app.register_blueprint(Tags_routes, url_prefix="/api/tags")
app.register_blueprint(album_routes, url_prefix="/api/albums")

db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app)


# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........
@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    if path == 'favicon.ico':
        return app.send_from_directory('public', 'favicon.ico')
    return app.send_static_file('index.html')
