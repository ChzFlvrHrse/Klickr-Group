import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getImagesThunk } from "../../store/image";
import EditImageForm from "../ImagesForms/EditImageForm";
import DeleteImageForm from "../ImagesForms/DeleteImageForm";
import EditCommentForm from "../Comments/EditCommentForm";
import DeleteCommentForm from "../Comments/DeleteCommentForm";
import { getAllUsersThunk } from "../../store/AllUsers";
import { createACommentThunk, getAllCommentsThunk } from "../../store/comments";
import { createLikesThunk, deleteLikesThunk } from "../../store/likes";
import { Modal } from "../../context/Modal";
import { ImageModal } from "../../context/Modal copy";
import { useHistory } from "react-router-dom";
import { getImageTagsThunk } from "../../store/tags";
import CreateTagForm from "../Tags/CreateTagForm";
import DeleteTagForm from "../Tags/DeleteTagForm";
import klickrLogo from "../../icons/Klickr-logo.png";
import { NavLink } from "react-router-dom";
import "./imageDetails.css";

function ImageDetails() {
  const history = useHistory()
  const [showModal, setShowModal] = useState(false);
  const [imageLiked, setImageLiked] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [commentState, setCommentState] = useState({});
  const [body, setBody] = useState("");
  // keep track of previous image
  const [previousImage, setPreviousImage] = useState(false);
  // keep track of next image
  const [nextImage, setNextImage] = useState(false);
  const [imageState, setImageState] = useState(false);

  let [commDelete] = useState(1);

  const [showModalImageDelete, setShowModalImageDelete] = useState(false);
  const [showModalImageEdit, setShowModalImageEdit] = useState(false);

  const [showModalTagsDelete, setShowModalTagsDelete] = useState(false);
  const [showModalTagsEdit] = useState(false);
  // to keep track of individual tags
  const [tagState, setTagState] = useState(false);

  const dispatch = useDispatch();
  const { id } = useParams();

  //   variables
  let allImagesArray;
  let allUsersArray;
  let allImagesFiltered;
  let imageOwner;
  let owner;
  //   keep track of imageNumber in array (zero indexed)
  let filteredIndex;
  let imageLikedByUser;

    // redux states
    const images = useSelector((state) => state.image);
    const allusers = useSelector((state) => state.allUsers);
    const user = useSelector((state) => state.session.user);
    const likes = useSelector((state) => state.likes);
    const comment = useSelector((state) => state.comments);
    const tags = useSelector((state) => state.tags);
  // useEffects
  useEffect(() => {
    dispatch(getImagesThunk());
  }, [
    dispatch,
    allUsersArray,
    allImagesArray,
    showModalImageEdit,
    showModalImageDelete,
    allImagesFiltered,
    imageLiked,
    user, allImagesFiltered, id, images
  ]);

  useEffect(() => {
    dispatch(getAllUsersThunk());
  }, [dispatch, allImagesFiltered, allImagesArray]);

  useEffect(() => {
    dispatch(getAllCommentsThunk());
  }, [dispatch, showModal, showModalEdit, commentState, commDelete]);

  useEffect(() => {
    dispatch(getImageTagsThunk(id));
  }, [dispatch, tagState, showModalTagsDelete, showModalTagsEdit, id]);


let userId

if(user){
  userId = user.id
}

  // filters
  allImagesArray = Object.values(images);
  allUsersArray = Object.values(allusers);

  if (allUsersArray && allImagesArray && user) {
    allImagesFiltered = allImagesArray.filter(
      (filteredImages, index) => filteredImages.id == id
    );
    if (allImagesArray && allImagesFiltered.length > 0 && user) {
      imageLikedByUser = allImagesFiltered[0].likes.filter(
        (filteredLikes, index) => filteredLikes.userId == user.id
      );
    }
  }

  //   find index
  if (allUsersArray && allImagesArray) {
    filteredIndex = allImagesArray.findIndex((image) => image.id == id);
  }
  const tagsArray = Object.values(tags);

  let likesArray = Object.values(likes);
  let filteredLikes;

  let commentsArray = Object.values(comment);
  let filteredComments = commentsArray.filter(
    (comments) => comments.imageId == id
  );
  // console.log(filteredComments)

  filteredLikes = likesArray.filter(
    (filteredLikes, index) => filteredLikes.userId == user.id
  );

  let nextImageIndex = filteredIndex + 1;
  let currentImageIndex = filteredIndex;
  let previousImageIndex = filteredIndex - 1;

  const userLikeId = filteredLikes[0];
  // console.log(userLikeId)
  // toggle likes on and off (post and delete)
  const toggleLikes = (e) => {
    e.preventDefault();
    if (imageLikedByUser.length == 0) {
      dispatch(createLikesThunk(id)).then(() => setImageLiked(!imageLiked));
    } else if (imageLikedByUser.length >= 1) {
      dispatch(deleteLikesThunk(imageLikedByUser[0].id)).then(() =>
        setImageLiked(!imageLiked)
      );
    }
  };

  // handle comment submission
  const submitComment = async (e) => {
    e.preventDefault();

    if (body.length) {
      await dispatch(createACommentThunk(userId, id, body));
      setBody("");
    } else {
      return "Bad Data";
    }
  };

  let createdAtDate;

  // console.log(allImagesFiltered[0].created_at)
  // Image created_at Date formatting
  if (user && allImagesArray) {

    if (allImagesFiltered[0]) {
      const createdAtObject = allImagesFiltered[0].created_at;
    const createdAtString = JSON.stringify(createdAtObject);
    const date = createdAtString.slice(5, 8);
    const month = createdAtString.slice(9, 12);
    const year = createdAtString.slice(13, 17);
    createdAtDate = `${month} ${date}, ${year}`;
  }
}
  if (allUsersArray.length && allImagesArray.length && allImagesFiltered.length > 0) {
    imageOwner = allUsersArray.filter(
      (user) => user.id == allImagesFiltered[0].userId
    );
  }
  if (imageOwner && allImagesFiltered) {
    owner = imageOwner[0];
  }

  //   console.log(allImagesArray[previousImageNumber])
  // check to see if current photo has previous images and upcoming images, if so display arrows
  useEffect(() => {
    if (
      allImagesArray[nextImageIndex] != undefined &&
      allImagesArray[nextImageIndex] != null
    ) {
      setNextImage(true);
    } else setNextImage(false);

    if (
      allImagesArray[previousImageIndex] != undefined &&
      allImagesArray[previousImageIndex] != null
    ) {
      setPreviousImage(true);
    } else setPreviousImage(false);
  }, [dispatch, previousImage, nextImage, allImagesArray, id, filteredIndex]);

  if (!user) {
    return (
      <>
        <div>{history.push('/404')}</div>
      </>
    );
  }

else if (allImagesFiltered.length  && allImagesArray && user && allUsersArray) {
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
            {allImagesFiltered[0].userId == user.id ? (
              <div className="editArrowComment">
                <i
                  onClick={() => {
                    setShowModalImageEdit(true);
                    setImageState(allImagesFiltered[0]);
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
              <ImageModal onClose={() => setShowModalImageEdit(false)}>
                <EditImageForm
                  imageId={id}
                  setShowModalEdit={setShowModalImageEdit}
                  oldImage={imageState}
                />
              </ImageModal>
            )}
            {allImagesFiltered[0].userId == user.id ? (
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
                <DeleteImageForm
                  imageId={id}
                  setShowModal={setShowModalImageDelete}
                  image={allImagesFiltered[0]}
                />
              </ImageModal>
            )}

            {/* delete modal */}
          </div>
        </div>

        <div className="imageContainerImageDetails">
          {previousImage == true &&
          allImagesArray[previousImageIndex] != undefined ? (
            <Link
              to={`/images/${allImagesArray[previousImageIndex].id}`}
              className="previousImageClick"
            >
              <i class="fa-solid fa-circle-arrow-left"></i>
            </Link>
          ) : (
            <i class=""></i>
          )}
          <div id="user-image-details-container">
            <img src={allImagesFiltered[0].previewImageUrl} alt="" />
          </div>
          {nextImage == true && allImagesArray[nextImageIndex] != undefined ? (
            <Link
              to={`/images/${allImagesArray[nextImageIndex].id}`}
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
              allImagesArray.length ? "Filteredsong-container" : "HiddenResult"
            }
          >
            <div className="PhotoArrayImageDetails">
              {allImagesArray &&
                allImagesArray.map((image) => {
                  return (
                    <div className="TrendingsongCard" key={image.id}>
                      <Link to={`/images/${image.id}`}>
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
          <div className="rightMostDivImageArrayDetails">
            {/* allImagesFiltered */}
            {imageLikedByUser.length > 0 ? (
              <i class="fa-solid fa-star" id="star" onClick={toggleLikes}></i>
            ) : (
              <i class="fa-regular fa-star" id="star" onClick={toggleLikes}></i>
            )}
            <a
              href={allImagesArray[currentImageIndex].previewImageUrl}
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              <i class="fa-solid fa-download" title="download photo"></i>
            </a>
            {/* <Link href={allImagesArray[currentImageIndex].previewImageUrl} download>
              <i class="fa-solid fa-download" title="download photo"></i>
            </Link> */}
          </div>
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
              <div id="title">{allImagesFiltered[0].title}</div>
              <div id="description">{allImagesFiltered[0].description}</div>
            </div>
          </div>
          <div className="bottom-border"></div>
          {filteredComments &&
            filteredComments.map((comment) => {
              return (
                <div key={comment.id} className="comment-box">
                  <br />
                  {/* map through users array and display username if id matches userId */}
                  <div>
                    {allUsersArray &&
                      allUsersArray.map((singleUser) => {
                        return (
                          <div className="user-name">
                            {singleUser.id == comment.userId ? (
                              <img
                                className="comment-profile-img"
                                src={singleUser.previewImageUrl}
                              ></img>
                            ) : (
                              ""
                            )}
                            <div className="user-name-commentDate-options">
                              {singleUser.id == comment.userId ? (
                                <Link
                                  to={`/users/${singleUser.id}`}
                                  className="profile-link"
                                >
                                  {singleUser.first_name +
                                    " " +
                                    singleUser.last_name}
                                </Link>
                              ) : (
                                ""
                              )}
                              {singleUser.id == comment.userId ? (
                                <div className="comment-date">
                                  {comment.updated_at.slice(0, 16)}
                                </div>
                              ) : (
                                <></>
                              )}
                              <div className="edit-delete">
                                {singleUser.id == comment.userId &&
                                singleUser.id == userId ? (
                                  <i
                                    onClick={() => {
                                      setShowModalEdit(true);
                                      setCommentState(comment);
                                    }}
                                    className="edit-comment"
                                    title="edit comment"
                                    class="fa-solid fa-pen-to-square"
                                  ></i>
                                ) : (
                                  <></>
                                )}
                                {/* {singleUser.id == comment.userId && singleUser.id == userId ? <i onClick={async (e) => { e.preventDefault(); await dispatch(deleteACommentThunk(id, comment.id)); setCommDelete(commDelete++) }} className="delete-comment" title='delete' class="fa-solid fa-delete-left"></i> : <></>} */}
                                {singleUser.id == comment.userId &&
                                singleUser.id == userId ? (
                                  <i
                                    onClick={() => {
                                      setShowModal(true);
                                      setCommentState(comment);
                                    }}
                                    className="delete-comment"
                                    title="delete"
                                    class="fa-solid fa-delete-left"
                                  ></i>
                                ) : (
                                  <></>
                                )}
                                {showModalEdit && (
                                  <Modal
                                    onClose={() => setShowModalEdit(false)}
                                  >
                                    <EditCommentForm
                                      imageId={id}
                                      userId={userId}
                                      setShowModalEdit={setShowModalEdit}
                                      oldComment={commentState}
                                    />
                                  </Modal>
                                )}
                                {showModal && (
                                  <Modal onClose={() => setShowModal(false)}>
                                    <DeleteCommentForm
                                      imageId={id}
                                      setShowModal={setShowModal}
                                      comment={commentState}
                                    />
                                  </Modal>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                  <div className="body">{comment.body}</div>
                </div>
              );
            })}
          <div id="create-comment">
            <form onSubmit={submitComment}>
              <textarea
                id="comment-here"
                placeholder="Add a comment"
                tabIndex="0"
                type="text"
                onChange={(event) => setBody(event.target.value)}
                value={body}
              ></textarea>
              <div className="submit-containerParent">
                <div id="submit-container">
                  <button type="submit" id="submit-comment">
                    Comment
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="RightSideContainerDetails">
          <div className="topRightSideContainerDetails">
            <div id="faves">
              {allImagesFiltered[0].likes.length}
              <div className="tag">faves</div>
            </div>
            <div id="comment-talley">
              {filteredComments.length}
              <div className="tag">comments</div>
            </div>
            <div id="date">Taken on {`${createdAtDate}`}</div>
          </div>
          <div className="bottom-border"></div>
          <h4 className="TagsHeader">Tags</h4>
          <div className="bottomRightSideContainerDetails">
            <div className="TagsContainer">
              {tagsArray &&
                tagsArray.map((tag, index) => {
                  return (
                    <div key={tag.id}>
                      <div className="tagSingleContainer">
                        {/* {allImagesFiltered[0].userId == user.id ? (
                          <i
                            onClick={() => {
                              setShowModalTagsEdit(true);
                              setTagState(tag);
                            }}
                            className="edit-comment"
                            title="edit tag"
                            class="fa-solid fa-pen-to-square"
                          ></i>
                        ) : (
                          <></>
                        )}
                        {showModalTagsEdit && (
                          <Modal onClose={() => setShowModalTagsEdit(false)}>
                            <EditTagForm
                              imageId={id}
                              userId={userId}
                              setShowModalEdit={setShowModalTagsEdit}
                              oldTag={tagState}
                            />
                          </Modal>
                        )} */}

                        <div>{tag.body}</div>
                        {allImagesFiltered[0].userId == user.id ? (
                          <div className="DeleteTagButton">
                            <i
                              onClick={() => {
                                setShowModalTagsDelete(true);
                                setTagState(tag);
                              }}
                              className="delete-comment"
                              id="delete-tag"
                              title="delete tag"
                              class="fa-solid fa-xmark"
                            ></i>
                          </div>
                        ) : (
                          <></>
                        )}
                        {showModalTagsDelete && (
                          <Modal onClose={() => setShowModalTagsDelete(false)}>
                            <DeleteTagForm
                              imageId={id}
                              setShowModal={setShowModalTagsDelete}
                              tag={tagState}
                            />
                          </Modal>
                        )}

                        {/* delete modal */}
                      </div>
                    </div>
                  );
                })}
            </div>

            {allImagesFiltered[0].userId == user.id && (
              <CreateTagForm userId={userId} imageId={id} />
            )}
          </div>
          <div className="bottom-border2"></div>
        </div>
      </div>
    </>
  );
}
 // if image does not exist

else if (!allImagesFiltered.length && allImagesArray && allUsersArray && user) {
  return (
    <>
      <div className="login-containerPNF">
      <div className="inner-loginPNF">
        <div id="login-bannerPNF">
          <div id="circles-containerPNF">
            <img src={klickrLogo} alt="" id="circlesPNF"></img>
          </div>
          <h4 id="to-klickr1">Image Not Found</h4>
          <div className="linkerror">
            <NavLink to="/" className='linkerrorText'>Click here to go home</NavLink>
          </div>
        </div>
      </div>
    </div>
    </>
  );

}

}

export default ImageDetails;
