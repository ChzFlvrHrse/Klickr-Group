import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import { newAlbumThunk } from "../../store/album";
import { getAlbumsThunk } from "../../store/album";

import "./createAlbum.css";

export default function CreateAlbumForm() {
  const user = useSelector((state) => state.session.user);
  const [previewImageUrl, setPreviewImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const userId = user.id;
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const errors = [];

    if (title.length < 1 || title.length > 49)
      errors.push("Name must be between 1 and 49 characters");
    if (!description) errors.push("Please provide a description");
    if (!previewImageUrl) errors.push("Please provide a previewImage");

    return setErrors(errors);
  }, [title, description, previewImageUrl]);

  if (user === null) {
    alert("You must be logged in to make a image");
    return <Redirect to="/" />;
  }

  async function onSubmit(e) {
    e.preventDefault();
    setHasSubmitted(true);
    if (errors.length > 0) {
      return alert(
        "There was an error with your submit, Please recheck your inputs"
      );
    }

    function loadImage(previewImageUrl) {
      return previewImageUrl;
    }

    if (loadImage(previewImageUrl)) {
      dispatch(newAlbumThunk(userId, title, description, previewImageUrl)).then(() => dispatch(getAlbumsThunk()));
      // history.push("/explore");
    }
  }

  return (
    <div className="EntireContainerForUploadForm">
    <div className="background-image">
    <div className="Whole-container">
      <div className="Image-Container">
        <h2 className="header-message">You can upload 1000 more photos.</h2>
        <h3 className="header-message3">
          Get automatic photo backup on all your devices with Klickr.
        </h3>
        <div className="show-errors">
          {hasSubmitted && errors.length > 0 && (
            <ul className="errors-list">
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          )}
        </div>
        <form onSubmit={onSubmit} className="create-image-form">
          <div className="image-input">
            <input
              className="preview-image-input"
              type="url"
              name="preview-image"
              placeholder="Album URL"
              value={previewImageUrl}
              onChange={(e) => setPreviewImageUrl(e.target.value)}
              required
            />
            <input
              className="preview-image-input"
              type="text"
              placeholder="Title of Album"
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
          </div>
          <div className="image-bttn">
            <button className="create-image-button" type="submit">
              Upload Album
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
    </div>
  );
}
