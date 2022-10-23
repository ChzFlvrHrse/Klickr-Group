import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateACommentThunk } from "../../store/comments";
import "./EditComment.css"
/*



!!!!this form is for the explore page comments section




*/
// pass in userId and imageId into createComment form so we aren't relying
// on useParams for imageId (will help when building a comment section for each photo in explore page)
function EditCommentFormExplore({ imageId, setShowModalEdit, oldComment, submitted, setSubmitted }) {
  const dispatch = useDispatch();
  const id = oldComment.id
  const userId = oldComment.userId


  const [comment, setComment] = useState(oldComment.body);
  const [errors, setErrors] = useState([]);
  useEffect(() => {
    const formValidationErrors = [];

    if (comment.length > 500) {
      formValidationErrors.push("Comment body must be no more than 500 characters");
    }
    if (comment.length < 1) {
      formValidationErrors.push("Comment body must be more than 1 character");
    }


    setErrors(formValidationErrors);
  }, [comment]);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (errors.length <= 0) {
      return dispatch(
        updateACommentThunk(imageId, id, userId, comment)
      ).then(() => setShowModalEdit(false)).then(()=> setSubmitted(!submitted)).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    }
    return errors;
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    setShowModalEdit(false);
  };

  return (
    <div className="create-comment-container">
      <div className="create-comment-wrapper">
        <h3 className="edit-comment-title" style={{fontWeight: "300"}}>Edit Comment here:</h3>
      <form
        className="CreateComment-inner"
        onSubmit={handleSubmit2}
        autoComplete="off"
      >
        <div className="errorHandlingContainer">
          {errors.length > 0 && (
            <div className="HeaderErrorStyling">
              <ul className="UlBulletErrorStyling">
                {errors.map((error, idx) => (
                  <li className="ErrorPoints" key={idx}>
                    {error}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <textarea
          className="edit-comment-box"
          onChange={event => setComment(event.target.value)}
          value={comment}
        >{comment}</textarea>
        <div className="done-edit-container">
          <button className="done-edit" onClick={handleSubmit} type="submit">
            Done
          </button>
          <button id="edit-comment-cancel" className="done-edit" onClick={() => setShowModalEdit(false)} type="submit">
            Cancel
          </button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default EditCommentFormExplore;
