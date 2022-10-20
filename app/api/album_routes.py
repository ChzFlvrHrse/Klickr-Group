from flask import Blueprint, jsonify, redirect, render_template, request, request
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages

from app.forms.image_form import UploadForm
from app.models import Image, Comment, Like, db, Tag, Album
from app.forms import AlbumForm

album_routes = Blueprint('albums', __name__)

# all albums
@album_routes.route('/all')
# @login_required
def all_albums():
    allAlbums = Album.query.all()
    albums = {"albums": [album.to_dict() for album in allAlbums]}
    return albums

# one album
@album_routes.route('/<int:id>')
@login_required
def get_album(id):
     album = Album.query.get(id)
     if album == None:
        return "Album is not available"
     return album.to_dict()

@album_routes.route("/upload", methods=["POST"])
@login_required
def create_album():
    form = AlbumForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        new_album = Album(
            userId=data["userId"],
            title=data["title"],
            description=data["description"],
            previewImageUrl=data["previewImageUrl"]
        )

        db.session.add(new_album)
        db.session.commit()
        return new_album.to_dict()
    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@album_routes.route("/<int:id>/edit", methods=["PUT"])
@login_required
def edit_album(id):
    form = AlbumForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        old_album = Album.query.get(id)
        data = form.data
        old_album.title = data["title"]
        old_album.description = data["description"]
        old_album.previewImageUrl = data["previewImageUrl"]

        db.session.commit()

        return old_album.to_dict()
    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@album_routes.route("/<int:id>/delete", methods=["DELETE"])
@login_required
def delete_album(id):
    album = Album.query.get(id)
    db.session.delete(album)
    db.session.commit()
    return {
    "Message": "Album successfully deleted",
    "statusCode": "200"
    }
