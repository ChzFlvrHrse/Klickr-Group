import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateATagThunk } from "../../store/tags";
import "./EditComment.css"

// pass in userId and imageId into createComment form so we aren't relying
// on useParams for imageId (will help when building a comment section for each photo in explore page)
function EditTagForm({ imageId, setShowModalEdit, oldTag, submitted, setSubmitted }) {
  const dispatch = useDispatch();
  const id = oldTag.id
  const userId = oldTag.userId


  const [tag, setTag] = useState(oldTag.body);
  const [errors, setErrors] = useState([]);
  useEffect(() => {
    const formValidationErrors = [];

    if (tag.length > 500) {
      formValidationErrors.push("Tag body must be no more than 500 characters");
    }
    if (tag.length < 1) {
      formValidationErrors.push("Tag body must be more than 1 character");
    }


    setErrors(formValidationErrors);
  }, [tag]);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (errors.length <= 0) {
      return dispatch(
        updateATagThunk(imageId, id, userId, tag)
      ).then(() => setShowModalEdit(false)).catch(async (res) => {
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
        <h3 className="edit-comment-title">Edit Tag here:</h3>
        <div>
          <form
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
              onChange={event => setTag(event.target.value)}
              value={tag}
            >{tag}</textarea>
            <div className="done-edit-container">
              <button className="done-edit" onClick={handleSubmit} type="submit">
                Done
              </button>
              <button id="cancel" className="done-edit" onClick={() => setShowModalEdit(false)} type="submit">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditTagForm;
