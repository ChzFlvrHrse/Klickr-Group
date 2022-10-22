import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createATagThunk } from "../../store/tags";
import "./CreateTagForm.css";
// pass in userId and imageId into createComment form so we aren't relying
// on useParams for imageId (will help when building a comment section for each photo in explore page)
function CreateTagForm({ userId, imageId }) {
  const dispatch = useDispatch();

  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState([]);
  useEffect(() => {
    const formValidationErrors = [];

    setErrors(formValidationErrors);
  }, [comment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (errors.length <= 0) {
      return dispatch(createATagThunk(userId, imageId, comment))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        })
        .then(setComment(""));
    }
    return errors;
  };

  return (
    <div id="create-tags">
      <form
        className="CreateTag-inner"
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
        {/* <h1 className="CreateCommentHeader">Create a Tag</h1> */}
        <div className="tag-input-container">
          <textarea
            id="tagAdd-here"
            placeholder="Add a tag"
            type="text"
            autoComplete="off"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
          <div className="createTagButton">
            <div className="submit-containerParent">
              <div id="submit-container">
                <button id="submit-comment" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateTagForm;
<div className="submit-containerParent">
  <div id="submit-container">
    <button type="submit" id="submit-comment">
      Comment
    </button>
  </div>
</div>;
