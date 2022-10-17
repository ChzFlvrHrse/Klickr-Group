import React, { useState, useEffect } from "react";
import { useDispatch} from "react-redux";
import { updateACommentThunk } from "../../store/comments";

// pass in userId and imageId into createComment form so we aren't relying
// on useParams for imageId (will help when building a comment section for each photo in explore page)
function EditCommentForm({imageId, setShowModalEdit, oldComment}) {
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
        updateACommentThunk(imageId, id, userId, comment )
      ).then(() =>  setShowModalEdit(false)).catch(async (res) => {
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
    <div className="CreateComment-outer">
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
        <h1 className="CreateCommentHeader">Edit a Comment</h1>
        <input
          className="descriptionCreateComment"
          placeholder="comment..."
          type="text"
          autoComplete="off"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <div className="createCommentButton">
          <button className="submitCreateComment" onClick={handleSubmit} type="submit">
            Submit Comment
          </button>
          <button className="submitCreateComment" onClick={() => setShowModalEdit(false)} type="submit">
            Cancel Edit
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditCommentForm;
