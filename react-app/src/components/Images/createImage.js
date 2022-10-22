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
  const allImagesArray = Object.values(images)
  const [previewImageUrl, setPreviewImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [albumId, setAlbumId] = useState("");
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const userId = user.id;
  const dispatch = useDispatch();
  const history = useHistory();

// filter all albums so user can choose between them in drop down
  useEffect(() => {
    dispatch(getImagesThunk());
  }, [dispatch, user, newAlbumThunk ]);
  useEffect(() => {
    dispatch(getAlbumsThunk());
  }, [dispatch, user, newAlbumThunk ]);
  useEffect(() => {
    dispatch(getImagesThunk());
  }, [dispatch]);



  let myImagesFilter = allImagesArray.filter((filteredImages, index) => filteredImages.userId == user.id)
  let myAlbumsFilter = AlbumsArray.filter(
    (filteredAlbums, index) => filteredAlbums.userId == user.id
  );

// create new album if user does not have one already

useEffect(() => {
  if (user && !myAlbumsFilter.length && AlbumsArray.length && !myImagesFilter.length && AlbumsArray[AlbumsArray.length - 1].userId !=user.id) {
    //get all songs
    const albumTitle = 'Default Album'
    const albumDescription = 'New album made for new accounts'
    const albumImageUrl ='https://www.shareicon.net/data/2015/10/01/110175_media_512x512.png'

    dispatch(newAlbumThunk(userId, albumTitle, albumDescription, albumImageUrl)).then(
      () => dispatch(getAlbumsThunk())
    );;
  }
}, [dispatch, user]);
  useEffect(() => {
    const errors = [];

    if (!title)
      errors.push("Please provide a title for image");
    if (!description) errors.push("Please provide a description");
    if (!previewImageUrl) errors.push("Please provide a image");

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
      dispatch(newImageThunk(userId, title, description, previewImageUrl, albumId)).then(
        () => dispatch(getImagesThunk())
      );
      history.push("/explore");
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
