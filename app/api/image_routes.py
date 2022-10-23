from flask import Blueprint, jsonify, redirect, render_template, request
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages

from app.forms.image_form import UploadForm
from app.forms.comment_form import CommentForm
from app.models import Image, Comment, Like, db, Tag
from app.forms.tag_form import TagForm

image_routes = Blueprint('images', __name__)

# form['csrf_token'].data = request.cookies['csrf_token']

@image_routes.route('/<int:id>')
@login_required
def get_image(id):
     image = Image.query.get(id)
     if image == None:
        return "Image is not available"
     return image.to_dict()

@image_routes.route("/upload", methods=["POST"])
@login_required
def create_data():
    form = UploadForm()
    # userId=current_user.id
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        new_image = Image(
            userId=data["userId"],
            title=data["title"],
            description=data["description"],
            previewImageUrl=data["previewImageUrl"]
        )

        db.session.add(new_image)
        db.session.commit()
        return new_image.to_dict()
    if form.errors:
        # return form.data
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@image_routes.route("/<int:id>/edit", methods=["PUT"])
@login_required
def edit_image(id):
    form = UploadForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        old_image = Image.query.get(id)
        data = form.data
        old_image.title = data["title"]
        old_image.description = data["description"]
        old_image.previewImageUrl = data["previewImageUrl"]

        db.session.commit()

        return old_image.to_dict()
    if form.errors:
        # return form.data
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@image_routes.route("/<int:id>/delete", methods=["DELETE"])
@login_required
def delete_image(id):
    image = Image.query.get(id)
    db.session.delete(image)
    db.session.commit()
    return {
    "Message": "Image successfully deleted",
    "statusCode": "200"
    }


# comments


# all Comments by imageId
@image_routes.route('/<int:imageId>/comment', methods=["GET"])
@login_required
def get_commentbyImage(imageId):
    comments = Comment.query.filter_by(imageId=imageId).all()
    if comments == None:
        return "Image has no comments"
    return {comment.id: comment.to_dict() for comment in comments}

#Post a comment
@image_routes.route('/<int:imageId>/comment/new', methods=['POST'])
@login_required
def new_Comment(imageId):
    form = CommentForm()
    # image = Image.query.get(imageId)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        new_comment = Comment(


            # validate user login, comeback to test when frontend is being built
            # grab imageId onclick on front end
            # userId=current_user.id,
            userId=data['userId'],
            imageId=data['imageId'],
            # might only need body tag
            body=data['body'],
        )
        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict()
    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400
    return render_template("test.html", form=form)



#Edit a comment
@image_routes.route('/<int:imageId>/comment/<int:id>/edit', methods=['GET','PUT'])
@login_required
def edit_Comment(imageId, id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        editedComment = Comment.query.get(id)
        data = form.data
        editedComment.userId = data['userId']
        # # might only need body tag
        editedComment.body = data['body']
        db.session.commit()
        return editedComment.to_dict()
    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400
    return render_template("test.html", form=form)

#Delete a comment
@image_routes.route('/<int:imageId>/comment/<int:id>/delete', methods=['GET', 'DELETE'])
@login_required
def delete_comment(imageId, id):
    comment = Comment.query.get(id)
    db.session.delete(comment)
    db.session.commit()
    return {
    "Message": "like successfully deleted",
    "statusCode": "200"
    }



# likes



# Get All Likes by image id (move to images routes)
# image/comments/imageid
@image_routes.route('/<int:imageId>/likes')
@login_required
def imageLikes(imageId):
    all_likes = Like.query.filter_by(imageId=imageId).all()
    if all_likes == None:
        return "image has no likes"
    likes = {like.id: like.to_dict() for like in all_likes}
    return likes

# Make a new Like
@image_routes.route('/<int:imageId>/likes/new', methods=["POST"])
@login_required
def postLike(imageId):

        like = Like.query.filter_by(imageId=imageId, userId=current_user.id).first()
        if like:
            db.session.delete(like)
            db.session.commit()
            return like.to_dict()
        else:
            new_like = Like(
            userId=current_user.id,
            imageId=imageId
        )
        db.session.add(new_like)
        db.session.commit()
        return new_like.to_dict()
    # newLike = Like(
    # userId=current_user.id,
    # imageId=imageId,
    # )
    # db.session.add(newLike)
    # db.session.commit()
    # return newLike.to_dict()

#Delete a comment
@image_routes.route('/<int:imageId>/likes/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_likes(id):
    likes = Like.query.filter_by(userId = id).all()

    # likes = Like.query.get(id)
    db.session.delete(likes)
    db.session.commit()
    return "Successfully Deleted Comment"



# tags


# all tags by imageId
@image_routes.route('/<int:imageId>/tag', methods=["GET"])
@login_required
def get_tagsbyImage(imageId):
    tags = Tag.query.filter_by(imageId=imageId).all()
    if tags == None:
        return "Image has no tags"
    return {tag.id: tag.to_dict() for tag in tags}

#Post a tag
@image_routes.route('/<int:imageId>/tag/new', methods=['POST'])
@login_required
def new_Tag(imageId):
    form = TagForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        new_tag = Tag(
            userId=data['userId'],
            imageId=data['imageId'],
            body=data['body'],
        )
        db.session.add(new_tag)
        db.session.commit()
        return new_tag.to_dict()
    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400
    return render_template("test.html", form=form)



#Edit a tag
@image_routes.route('/<int:imageId>/tag/<int:id>/edit', methods=['GET','PUT'])
@login_required
def edit_Tag(imageId, id):
    form = TagForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        editedTag = Tag.query.get(id)
        data = form.data
        editedTag.userId = data['userId']
        # # might only need body tag
        editedTag.body = data['body']
        db.session.commit()
        return editedTag.to_dict()
    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400
    return render_template("test.html", form=form)

#Delete a tag
@image_routes.route('/<int:imageId>/tag/<int:id>/delete', methods=['GET', 'DELETE'])
@login_required
def delete_Tag(imageId, id):
    tag = Tag.query.get(id)
    db.session.delete(tag)
    db.session.commit()
    return {
    "Message": "Tag successfully deleted",
    "statusCode": "200"
    }
