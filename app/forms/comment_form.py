from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired


class CommentForm(FlaskForm):
    userId = IntegerField("userId", validators=[DataRequired()])
    imageId = IntegerField("imageId", validators=[DataRequired()])
    body = StringField("body", validators=[DataRequired()])
    submit = SubmitField("Submit")
