import React, { useState, useEffect } from "react";
import { useDispatch} from "react-redux";
import { createACommentThunk } from "../../store/comments";

// pass in userId and imageId into createComment form so we aren't relying
// on useParams for imageId (will help when building a comment section for each photo in explore page)
function CreateCommentForm({userId, imageId}) {
  const dispatch = useDispatch();

  const [comment, setComment] = useState("");
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
        createACommentThunk(userId, imageId, comment )
      ).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    }
    return errors;
  };

  return (
    <div className="CreateComment-outer">
      <form
        className="CreateComment-inner"
        onSubmit={handleSubmit}
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
        <h1 className="CreateCommentHeader">Create a Comment</h1>
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
          <button className="submitCreateComment" type="submit">
            Submit new comment
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateCommentForm;
