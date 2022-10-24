import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateAlbumThunk } from "../../store/album";
import "./EditAlbumForm.css";

// pass in userId and imageId into createComment form so we aren't relying
// on useParams for imageId (will help when building a comment section for each photo in explore page)
function EditAlbumForm({ albumId, setShowModalEdit, oldAlbum }) {
  const dispatch = useDispatch();
  const userId = oldAlbum.userId;

  const [previewImageUrl, setPreviewImageUrl] = useState(
    oldAlbum.previewImageUrl
  );
  const [title, setTitle] = useState(oldAlbum.title);
  const [description, setDescription] = useState(oldAlbum.description);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const formValidationErrors = [];

    if (!title) formValidationErrors.push("Please provide an album title");
    if (!description) formValidationErrors.push("Please provide a description");
    if (!previewImageUrl) formValidationErrors.push("Please provide a previewImage");

    setErrors(formValidationErrors);
  }, [title, description, previewImageUrl]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (errors.length <= 0) {
      return dispatch(
        updateAlbumThunk(userId, title, description, previewImageUrl, albumId)
      )
        .then(() => setShowModalEdit(false))
        .catch(async (res) => {
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
    <div className="Edit-image-container">
      <div className="edit-image-container">
        <form
          className="Edit-image-inner"
          onSubmit={handleSubmit2}
          autoComplete="off"
        >
          <h2 className="EditImageHeader">Edit an Album</h2>
          <div className="errorHandlingContainer">
            {errors.length > 0 && (
              <div className="HeaderErrorStyling">
                <ul className="ImageUlBulletErrorStyling">
                  {errors.map((error, idx) => (
                    <li className="ImageErrorPoints" key={idx}>
                      {error}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="EditImageHeader">Edit Album Url:</div>
          <input
            className="preview-image-input"
            id="edit-image-input"
            type="url"
            name="preview-image"
            placeholder="Image URL"
            value={previewImageUrl}
            onChange={(e) => setPreviewImageUrl(e.target.value)}
            required
          />
          <div className="EditImageHeader">Album Title</div>
          <input
            className="preview-image-input"
            id="edit-image-input"
            type="text"
            placeholder="Title of Image"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <div className="edit-comment-title">Album Description</div>

          <input
            className="preview-image-input"
            id="edit-image-input"
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <div className="done-edit-container">
            <button
              className="done-edit-bttn"
              onClick={handleSubmit}
              type="submit"
            >
              Submit Album
            </button>
            <button
              id="done-edit-cancel-bttn"
              className="done-edit-bttn"
              onClick={() => setShowModalEdit(false)}
              type="submit"
            >
              Cancel Edit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditAlbumForm;
