import json
from app.seeds import comments
from flask import Blueprint, jsonify, render_template, request
from flask_login import login_required, current_user
from app.models import Comment, db
from app.forms.comment_form import CommentForm
from app.api.auth_routes import validation_errors_to_error_messages
Comments_routes = Blueprint('comments', __name__)

@Comments_routes.route('/all')
# @login_required
def commentsRoute():
    all_comments = Comment.query.all()
    comments = {comment.id: comment.to_dict() for comment in all_comments}
# changed from
    # comments = {"comments": [comment.to_dict() for comment in all_comments]}
    return comments

# specific comment by id
@Comments_routes.route('/<int:id>')
# @login_required
def get_comment(id):
    comments = Comment.query.get(id)
    if comments == None:
        return "No comments found"
    return comments.to_dict()
