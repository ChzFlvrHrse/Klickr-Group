import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import { newAlbumThunk } from "../../store/album";
import { getAlbumsThunk } from "../../store/album";

import "./createAlbum.css";

export default function CreateAlbumForm() {
  const user = useSelector((state) => state.session.user);
  const [albumPreviewImageUrl, setAlbumPreviewImageUrl] = useState("");
  const [albumTitle, setAlbumTitle] = useState("");
  const [albumDescription, setAlbumDescription] = useState("");
  const [albumErrors, setAlbumErrors] = useState([]);
  const [hasSubmittedAlbum, setHasSubmittedAlbum] = useState(false);
  const userId = user.id;
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const albumErrors = [];

    if (albumTitle.length < 1 || albumTitle.length > 49)
      albumErrors.push("Name must be between 1 and 49 characters");
    if (!albumDescription) albumErrors.push("Please provide a description");
    if (!albumPreviewImageUrl)
      albumErrors.push("Please provide a previewImage");

    return setAlbumErrors(albumErrors);
  }, [albumTitle, albumDescription, albumPreviewImageUrl]);

  if (user === null) {
    alert("You must be logged in to make a image");
    return <Redirect to="/" />;
  }

  async function onSubmitAlbum(e) {
    e.preventDefault();
    setHasSubmittedAlbum(true);
    if (albumErrors.length > 0) {
      return alert(
        "There was an error with your submit, Please recheck your inputs"
      );
    }

    function loadAlbum(albumPreviewImageUrl) {
      return albumPreviewImageUrl;
    }

    if (loadAlbum(albumPreviewImageUrl)) {
      dispatch(
        newAlbumThunk(
          userId,
          albumTitle,
          albumDescription,
          albumPreviewImageUrl
        )
      ).then(() => dispatch(getAlbumsThunk()));
      // history.push("/explore");
    }
  }

  return (
    <div className="EntireContainerForUploadForm">
      <div className="background-image">
        <div className="Whole-container">
          <div className="Image-Container">
            <h2 className="header-message">You can upload 1000 more albums.</h2>
            <h3 className="header-message3">
              Get automatic album backup on all your devices with Klickr.
            </h3>
            <div className="show-errors">
              {hasSubmittedAlbum && albumErrors.length > 0 && (
                <ul className="errors-list">
                  {albumErrors.map((error) => (
                    <li key={error}>{error}</li>
                  ))}
                </ul>
              )}
            </div>
            <form onSubmit={onSubmitAlbum} className="create-image-form">
              <div className="image-input">
                <input
                  className="preview-image-input"
                  type="url"
                  name="preview-image"
                  placeholder="Album URL"
                  value={albumPreviewImageUrl}
                  onChange={(e) => setAlbumPreviewImageUrl(e.target.value)}
                  required
                />
                <input
                  className="preview-image-input"
                  type="text"
                  placeholder="Title of Album"
                  value={albumTitle}
                  onChange={(e) => setAlbumTitle(e.target.value)}
                  required
                />
                <input
                  className="preview-image-input"
                  type="text"
                  placeholder="Description"
                  value={albumDescription}
                  onChange={(e) => setAlbumDescription(e.target.value)}
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
