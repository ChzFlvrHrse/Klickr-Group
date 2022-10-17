import json

from flask import Blueprint, jsonify, redirect, render_template
from flask_login import login_required

from app.models import Image, db

explore_route = Blueprint('explore', __name__)

@explore_route.route('/')
# @login_required
def explore():
    all_images = Image.query.all()
    images = {"images": [image.to_dict() for image in all_images]}
    return images
