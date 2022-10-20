from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, TextAreaField, IntegerField
from wtforms.validators import DataRequired


class AlbumForm(FlaskForm):
    userId = IntegerField("Id", validators=[DataRequired()])
    title = StringField("Title", validators=[DataRequired()])
    description=TextAreaField("Description")
    previewImageUrl = StringField("URL", validators=[DataRequired()])
    submit = SubmitField("Submit")
