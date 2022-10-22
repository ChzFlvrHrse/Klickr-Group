import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getImagesThunk } from "../../store/image";
import EditAlbumForm from "./EditAlbumForm";
import DeleteAlbumForm from "./DeleteAlbumForm";
import { getAllUsersThunk } from "../../store/AllUsers";
import { Modal } from "../../context/Modal";
import { ImageModal } from "../../context/Modal copy";
import { useHistory } from "react-router-dom";
import { getAlbumsThunk } from "../../store/album";
import klickrLogo from "../../icons/Klickr-logo.png";
import { authenticate } from "../../store/session";
import { NavLink } from "react-router-dom";
import "./AlbumDetails.css";

function AlbumDetails() {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [body, setBody] = useState("");
  // keep track of previous image
  const [previousImage, setPreviousImage] = useState(false);
  // keep track of next image
  const [nextImage, setNextImage] = useState(false);
  const [imageState, setImageState] = useState(false);

  const [showModalImageDelete, setShowModalImageDelete] = useState(false);
  const [showModalImageEdit, setShowModalImageEdit] = useState(false);

  const dispatch = useDispatch();
  const { id } = useParams();

  //   variables
  let allImagesArray;
  let allAlbumsArray;
  let allUsersArray;
  let allAlbumsFiltered;
  let allImagesFiltered;
  let imageOwner;
  let owner;
  //   keep track of imageNumber in array (zero indexed)
  let filteredIndex;

  // redux states
  const images = useSelector((state) => state.image);
  const allusers = useSelector((state) => state.allUsers);
  const user = useSelector((state) => state.session.user);
  const albums = useSelector((state) => state.album);
  // useEffects

  useEffect(() => {
    dispatch(getAlbumsThunk());
  }, [
    dispatch,
    allUsersArray,
    allImagesArray,
    showModalImageEdit,
    showModalImageDelete,
    allImagesFiltered,
    user,
    allImagesFiltered,
    id,
    images,
  ]);

  useEffect(() => {
    dispatch(getAllUsersThunk());
  }, [dispatch, allImagesFiltered, allImagesArray]);

  useEffect(() => {
    dispatch(getImagesThunk());
  }, [dispatch, showModal, showModalEdit, allAlbumsArray]);

  let userId;

  if (user) {
    userId = user.id;
  }

  // filters
  allImagesArray = Object.values(images);
  allAlbumsArray = Object.values(albums);
  allUsersArray = Object.values(allusers);

  if (allUsersArray && allAlbumsArray && user) {
    allAlbumsFiltered = allAlbumsArray.filter(
      (filteredAlbums, index) => filteredAlbums.id == id
    );
  }
  if (allUsersArray && allAlbumsArray && user && allImagesArray) {
    allImagesFiltered = allImagesArray.filter(
      (filteredImages, index) => filteredImages.albumId == id
    );
  }

  //   find index
  if (allUsersArray && allAlbumsArray) {
    filteredIndex = allAlbumsArray.findIndex((album) => album.id == id);
  }

  let nextImageIndex = filteredIndex + 1;
  let currentImageIndex = filteredIndex;
  let previousImageIndex = filteredIndex - 1;

  let createdAtDate;

  // console.log(allImagesFiltered[0].created_at)
  // Image created_at Date formatting
  if (user && allAlbumsArray) {
    if (allAlbumsFiltered[0]) {
      const createdAtObject = allAlbumsFiltered[0].created_at;
      const createdAtString = JSON.stringify(createdAtObject);
      const date = createdAtString.slice(5, 8);
      const month = createdAtString.slice(9, 12);
      const year = createdAtString.slice(13, 17);
      createdAtDate = `${month} ${date}, ${year}`;
    }
  }
  if (
    allUsersArray.length &&
    allAlbumsArray.length &&
    allAlbumsFiltered.length > 0
  ) {
    imageOwner = allUsersArray.filter(
      (user) => user.id == allAlbumsFiltered[0].userId
    );
  }
  if (imageOwner && allAlbumsFiltered) {
    owner = imageOwner[0];
  }

  //   console.log(allImagesArray[previousImageNumber])
  // check to see if current photo has previous images and upcoming images, if so display arrows
  useEffect(() => {
    if (
      allAlbumsArray[nextImageIndex] != undefined &&
      allAlbumsArray[nextImageIndex] != null
    ) {
      setNextImage(true);
    } else setNextImage(false);

    if (
      allAlbumsArray[previousImageIndex] != undefined &&
      allAlbumsArray[previousImageIndex] != null
    ) {
      setPreviousImage(true);
    } else setPreviousImage(false);
  }, [dispatch, previousImage, nextImage, allAlbumsArray, id, filteredIndex]);

  if (!user) {
    return (
      <>
        <div>{history.push("/404")}</div>
      </>
    );
  } else if (
    allAlbumsFiltered.length &&
    allAlbumsArray &&
    user &&
    allUsersArray
  ) {
    return (
      <>
        <div id="details-image">
          <div id="back-explore">
            <div className="LinktoHomeImageDetails">
              <Link to="/explore" className="i">
                <i class="fa-solid fa-arrow-left"></i>
              </Link>
              <Link to="/explore">Back to explore</Link>
            </div>
            <div className="EditDeleteImageSection">
              {/* edit modal */}
              {allAlbumsFiltered[0].userId == user.id ? (
                <div className="editArrowComment">
                  <i
                    onClick={() => {
                      setShowModalImageEdit(true);
                      setImageState(allAlbumsFiltered[0]);
                    }}
                    className="edit-comment"
                    title="edit image"
                    class="fa-solid fa-pen-to-square"
                  ></i>
                </div>
              ) : (
                <></>
              )}
              {showModalImageEdit && (
                <Modal onClose={() => setShowModalImageEdit(false)}>
                  <EditAlbumForm
                    albumId={id}
                    setShowModalEdit={setShowModalImageEdit}
                    oldAlbum={allAlbumsFiltered[0]}
                  />
                </Modal>
              )}
              {allAlbumsFiltered[0].userId == user.id ? (
                <div className="editArrowComment">
                  <i
                    onClick={() => {
                      setShowModalImageDelete(true);
                    }}
                    className="delete-comment"
                    title="delete image"
                    class="fa-solid fa-delete-left"
                  ></i>
                </div>
              ) : (
                <></>
              )}
              {showModalImageDelete && (
                <ImageModal onClose={() => setShowModalImageDelete(false)}>
                  <DeleteAlbumForm
                    albumId={id}
                    setShowModal={setShowModalImageDelete}
                    album={allAlbumsFiltered[0]}
                  />
                </ImageModal>
              )}

              {/* delete modal */}
            </div>
          </div>

          <div className="imageContainerImageDetails">
            {previousImage == true &&
            allAlbumsArray[previousImageIndex] != undefined ? (
              <Link
                to={`/albums/${allAlbumsArray[previousImageIndex].id}`}
                className="previousImageClick"
              >
                <i class="fa-solid fa-circle-arrow-left"></i>
              </Link>
            ) : (
              <i class=""></i>
            )}
            <div id="user-image-details-container">
              <img src={allAlbumsFiltered[0].previewImageUrl} alt="" />
            </div>
            {nextImage == true &&
            allAlbumsArray[nextImageIndex] != undefined ? (
              <Link
                to={`/albums/${allAlbumsArray[nextImageIndex].id}`}
                className="nextImageClick"
              >
                <i class="fa-solid fa-circle-arrow-right"></i>
              </Link>
            ) : (
              <i class=""></i>
            )}
          </div>
          <div className="img-scoll-like-container" id="star-like">
            {/* use this div to center next images */}
            <div className="leftMostDivImageArrayDetails"></div>
            {/* use this div to center next images */}
            <div
              className={
                allAlbumsArray.length
                  ? "Filteredsong-container"
                  : "HiddenResult"
              }
            >
              <div className="PhotoArrayImageDetails">
                {allAlbumsArray &&
                  allAlbumsArray.map((image) => {
                    return (
                      <div className="TrendingsongCard" key={image.id}>
                        <Link to={`/albums/${image.id}`}>
                          <img
                            className="TrendingsongImage"
                            src={image.previewImageUrl}
                          ></img>
                        </Link>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="rightMostDivImageArrayDetails"></div>
          </div>
        </div>
        <div id="image-info">
          <div className="LeftSideContainerDetails">
            <div className="owner-info-container">
              <div className="owner-profile-img-name">
                {owner && (
                  <img
                    className="user-profile-image"
                    src={owner.previewImageUrl}
                  ></img>
                )}
              </div>
              <div className="owner-image-info-container">
                {owner && (
                  <Link className="user" to={`/users/${owner.id}`}>
                    {owner.first_name} {owner.last_name}
                  </Link>
                )}
                <div id="title">{allAlbumsFiltered[0].title}</div>
                <div id="description">{allAlbumsFiltered[0].description}</div>
              </div>
            </div>
            <div className="bottom-border"></div>
            {allImagesFiltered &&
              allImagesFiltered.map((image) => {
                return (
                  <div key={image.id} className="comment-box">
                    <br />
                    {/* map through users array and display username if id matches userId */}
                    <div className="ImageIndividualContainerAlbums">
                      <Link to={`/images/${image.id}`}>
                        <img
                          className="TrendingsongImage"
                          src={image.previewImageUrl}
                        ></img>
                      </Link>
                      <div className="imageDetailsforAlbum">
                      <Link to={`/images/${image.id}`}>
                        <div className="imageTitleAlbums">{image.title}</div>
                        </Link>
                        <div>{image.description}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="RightSideContainerDetails">
            <div className="topRightSideContainerDetails">
              <div id="comment-talley">
                {allAlbumsFiltered[0].images.length}
                <div className="tag">Images</div>
              </div>
              <div id="date">Taken on {`${createdAtDate}`}</div>
            </div>
            <div className="bottom-border"></div>
          </div>
        </div>
      </>
    );
  }
  // if image does not exist
  else if (
    !allAlbumsFiltered.length &&
    allAlbumsArray &&
    allUsersArray &&
    user
  ) {
    return (
      <>
        <div className="login-containerPNF">
          <div className="inner-loginPNF">
            <div id="login-bannerPNF">
              <div id="circles-containerPNF">
                <img src={klickrLogo} alt="" id="circlesPNF"></img>
              </div>
              <h4 id="to-klickr1">Album Not Found</h4>
              <div className="linkerror">
                <NavLink to="/" className="linkerrorText">
                  Click here to go home
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default AlbumDetails;
