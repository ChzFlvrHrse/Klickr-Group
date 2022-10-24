import { newImageThunk, getImagesThunk } from "../../store/image";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";

import { getAlbumsThunk } from "../../store/album";
import { newAlbumThunk } from "../../store/album";

import "./createImage.css";

export default function CreateImageForm() {
  const user = useSelector((state) => state.session.user);
  const albums = useSelector((state) => state.album);
  const AlbumsArray = Object.values(albums);
  const images = useSelector((state) => state.image);
  const allImagesArray = Object.values(images);
  const [previewImageUrl, setPreviewImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [albumId, setAlbumId] = useState("");
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const userId = user.id;
  const dispatch = useDispatch();
  const history = useHistory();

  // album
  const [albumPreviewImageUrl, setAlbumPreviewImageUrl] = useState("");
  const [albumTitle, setAlbumTitle] = useState("");
  const [albumDescription, setAlbumDescription] = useState("");
  const [albumErrors, setAlbumErrors] = useState([]);
  const [hasSubmittedAlbum, setHasSubmittedAlbum] = useState(false);
  // track state
  const [returnState, setReturnState] = useState(true);

  // filter all albums so user can choose between them in drop down
  useEffect(() => {
    dispatch(getImagesThunk());
  }, [dispatch, user, newAlbumThunk]);
  useEffect(() => {
    dispatch(getAlbumsThunk());
  }, [dispatch, user, newAlbumThunk]);
  useEffect(() => {
    dispatch(getImagesThunk());
  }, [dispatch]);

  let myImagesFilter = allImagesArray.filter(
    (filteredImages, index) => filteredImages.userId == user.id
  );
  let myAlbumsFilter = AlbumsArray.filter(
    (filteredAlbums, index) => filteredAlbums.userId == user.id
  );

  // create new album if user does not have one already

  useEffect(() => {
    if (
      user &&
      !myAlbumsFilter.length &&
      AlbumsArray.length &&
      !myImagesFilter.length &&
      AlbumsArray[AlbumsArray.length - 1].userId != user.id
    ) {
      //get all songs
      const albumTitle = "Default Album";
      const albumDescription = "New album made for new accounts";
      const albumImageUrl =
        "https://www.shareicon.net/data/2015/10/01/110175_media_512x512.png";

      dispatch(
        newAlbumThunk(userId, albumTitle, albumDescription, albumImageUrl)
      ).then(() => dispatch(getAlbumsThunk()));
    }
  }, [dispatch, user]);
  useEffect(() => {
    const errors = [];

    if (!title) errors.push("Please provide a title for image");
    if (!description) errors.push("Please provide a description");
    if (!previewImageUrl) errors.push("Please provide a image");

    return setErrors(errors);
  }, [title, description, previewImageUrl]);

  // album useeffect error handling
  useEffect(() => {
    const albumErrors = [];

    if (!albumTitle)
      albumErrors.push("Please provide a title for album");
    if (!albumDescription) albumErrors.push("Please provide a description");
    if (!albumPreviewImageUrl)
      albumErrors.push("Please provide a previewImage");

    return setAlbumErrors(albumErrors);
  }, [albumTitle, albumDescription, albumPreviewImageUrl]);

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
      dispatch(
        newImageThunk(userId, title, description, previewImageUrl, albumId)
      ).then(() => dispatch(getImagesThunk()));
      history.push("/explore");
    }
  }

  // album onsubmit
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
      history.push("/explore");
    }
  }
  if (returnState == true) {
    return (
      <div className="EntireContainerForUploadForm">
        <div className="background-image">
          <div className="Whole-container">
            <div className="Image-Container">
              <h2 className="explore-title">
                <button
                  className="toggleResultsSearch"
                  onClick={() => {
                    setReturnState(!returnState);
                  }}
                >
                  {returnState == true ? (
                    <div>Upload Image</div>
                  ) : (
                    <div>Upload Album</div>
                  )}
                </button>
              </h2>
              <h2 className="header-message">
                You can upload 1000 more photos.
              </h2>
              <h3 className="header-message3">
                Get automatic photo backup on all your devices with Klickr.
              </h3>
              <div className="upload-img-errors">
                {hasSubmitted && errors.length > 0 && (
                  <ul className="errors-list">
                    {errors.map((error) => (
                      <li className="upload-img-errors-list" key={error}>{error}</li>
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
                    placeholder="Image URL"
                    value={previewImageUrl}
                    onChange={(e) => setPreviewImageUrl(e.target.value)}
                    // required
                  />
                  <input
                    className="preview-image-input"
                    type="text"
                    placeholder="Title of Image"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    // required
                  />
                  <input
                    className="preview-image-input"
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    // required
                  />
                  <select
                    className="preview-image-input"
                    value={albumId}
                    onChange={(e) => setAlbumId(e.target.value)}
                    // required
                  >
                    <option selected disabled value="">
                      Select an Album...
                    </option>
                    {myAlbumsFilter &&
                      myAlbumsFilter.map((album) => {
                        return (
                          <option
                            className="OptionsAlbumsDropdown"
                            value={album.id}
                            key={album.id}
                          >
                            {album.title}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="image-bttn">
                  <button className="create-image-button" type="submit">
                    Upload Photo
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (returnState == false) {
    return (
      <div className="EntireContainerForUploadForm">
        <div className="background-image">
          <div className="Whole-container">
            <div className="Image-Container">
              <h2 className="explore-title">
                <button
                  className="toggleResultsSearch"
                  onClick={() => {
                    setReturnState(!returnState);
                  }}
                >
                  {returnState == true ? (
                    <div>Upload Image</div>
                  ) : (
                    <div>Upload Album</div>
                  )}
                </button>
              </h2>
              <h2 className="header-message">
                You can upload 1000 more albums.
              </h2>
              <h3 className="header-message3">
                Get automatic album backup on all your devices with Klickr.
              </h3>
              <div className="upload-img-errors">
                {hasSubmitted && albumErrors.length > 0 && (
                  <ul className="errors-list">
                    {albumErrors.map((error) => (
                      <li className="upload-img-errors-list" key={error}>{error}</li>
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
}
