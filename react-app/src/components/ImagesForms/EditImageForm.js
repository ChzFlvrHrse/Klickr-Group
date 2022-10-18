import React, { useState, useEffect } from "react";
import { useDispatch} from "react-redux";
import { updateImageThunk } from "../../store/image";

// pass in userId and imageId into createComment form so we aren't relying
// on useParams for imageId (will help when building a comment section for each photo in explore page)
function EditImageForm({imageId, setShowModalEdit, oldImage}) {
  const dispatch = useDispatch();
  const userId = oldImage.userId


  const [previewImageUrl, setPreviewImageUrl] = useState(oldImage.previewImageUrl);
  const [title, setTitle] = useState(oldImage.title);
  const [description, setDescription] = useState(oldImage.description);
  const [errors, setErrors] = useState([]);
  useEffect(() => {
    const formValidationErrors = [];

    if (title.length < 1 || title.length > 49)
    errors.push("Name must be between 1 and 49 characters");
  if (!description) errors.push("Please provide a description");
  if (!previewImageUrl) errors.push("Please provide a previewImage");


    setErrors(formValidationErrors);
  }, [title, description, previewImageUrl, errors]);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (errors.length <= 0) {
      return dispatch(
        updateImageThunk(userId, title, description, previewImageUrl, imageId)
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
        <h1 className="CreateCommentHeader">Edit an Image</h1>
        <input
            className="preview-image-input"
            type="url"
            name="preview-image"
            placeholder="Image URL"
            value={previewImageUrl}
            onChange={(e) => setPreviewImageUrl(e.target.value)}
            required
          />
          <input
            className="preview-image-input"
            type="text"
            placeholder="Title of Image"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            className="preview-image-input"
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
        />
        <div className="createCommentButton">
          <button className="submitCreateComment" onClick={handleSubmit} type="submit">
            Submit Image
          </button>
          <button className="submitCreateComment" onClick={() => setShowModalEdit(false)} type="submit">
            Cancel Edit
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditImageForm;
