import React, { useState, useEffect } from "react";
import { useDispatch} from "react-redux";
import { updateAlbumThunk } from "../../store/album";
import './EditAlbumForm.css'

// pass in userId and imageId into createComment form so we aren't relying
// on useParams for imageId (will help when building a comment section for each photo in explore page)
function EditAlbumForm({albumId, setShowModalEdit, oldAlbum}) {
  const dispatch = useDispatch();
  const userId = oldAlbum.userId

  const [previewImageUrl, setPreviewImageUrl] = useState(oldAlbum.previewImageUrl);
  const [title, setTitle] = useState(oldAlbum.title);
  const [description, setDescription] = useState(oldAlbum.description);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const formValidationErrors = [];

    if (title.length < 1 || title.length > 49)
    errors.push("Name must be between 1 and 49 characters");
  if (!description) errors.push("Please provide a description");
  if (!previewImageUrl) errors.push("Please provide a previewImage");


    setErrors(formValidationErrors);
  }, [title, description, previewImageUrl]);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (errors.length <= 0) {
      return dispatch(
        updateAlbumThunk(userId, title, description, previewImageUrl, albumId)
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
    <div className="edit-image-container">
      <form
        className="Edit-image-inner"
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
        <h2 className="CreateCommentHeader">Edit an Album</h2>
        <div className="edit-comment-title">Edit Album Url:</div>
        <input
            className="preview-image-input"
            type="url"
            name="preview-image"
            placeholder="Image URL"
            value={previewImageUrl}
            onChange={(e) => setPreviewImageUrl(e.target.value)}
            required
          />
        <div className="edit-comment-title">Album Title</div>
          <input
            className="preview-image-input"
            type="text"
            placeholder="Title of Image"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        <div className="edit-comment-title">Album Description</div>

          <input
            className="preview-image-input"
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
        />
        <div className="done-edit-container">
          <button className="done-edit" onClick={handleSubmit} type="submit">
            Submit Album
          </button>
          <button className="done-edit" onClick={() => setShowModalEdit(false)} type="submit">
            Cancel Edit
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditAlbumForm;
