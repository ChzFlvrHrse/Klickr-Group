import json
from app.seeds import tags
from flask import Blueprint, jsonify, render_template, request
from flask_login import login_required, current_user
from app.models import Tag, db
from app.forms.tag_form import TagForm
from app.api.auth_routes import validation_errors_to_error_messages
Tags_routes = Blueprint('tags', __name__)

@Tags_routes.route('/all')
@login_required
def tagsRoute():
    all_tags = Tag.query.all()
    tags = {tag.id: tag.to_dict() for tag in all_tags}
    return tags

# specific comment by id
@Tags_routes.route('/<int:id>')
@login_required
def get_tag(id):
    tags = Tag.query.get(id)
    if tags == None:
        return "No tags found"
    return tags.to_dict()






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
        return form.data
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
