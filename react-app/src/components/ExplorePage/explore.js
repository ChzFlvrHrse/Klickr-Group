import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getImagesThunk } from "../../store/image";
import { Link } from "react-router-dom";
import { getAllUsersThunk } from "../../store/AllUsers";
import ExploreImageLikes from "./ExploreLikes";
import { getAlbumsThunk } from "../../store/album";
import ExploreImageComments from "./ExploreComments";
import "./explore.css";

const GetAllImages = () => {
  const history = useHistory();
  // fix delay on liking image, fix bug where spamming creates more likes (bypasses frontend validation)
  // allow user to exit modal when clicking elsewhere, but user also needs to stay on modal if interacting with it.
  //on click access modal with link active

  // track whether like state has been changed
  const [imageLiked, setImageLiked] = useState(false);
  const [returnState, setReturnState] = useState(true);

  // track whether image state is changed
  const [imageState, setImageState] = useState("");
  // track whether comments state is changed
  const [commentsState, setCommentsState] = useState(false);
  // track whether comments section is opened for user
  let [commentsModal, setCommentsModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const allImages = useSelector((state) => state.image);
  const allImagesArr = Object.values(allImages);

  const dispatch = useDispatch();
  let allImagesArray;
  let allAlbumsArray;
  let allUsersArray;

  useEffect(() => {
    dispatch(getImagesThunk());
  }, [dispatch, allUsersArray, allImagesArray, imageLiked, submitted]);
  useEffect(() => {
    dispatch(getAlbumsThunk());
  }, [dispatch, allUsersArray, allImagesArray, imageLiked, submitted]);
  // getting all users

  useEffect(() => {
    dispatch(getAllUsersThunk());
  }, [dispatch, allUsersArray]);

  const images = useSelector((state) => state.image);
  const albums = useSelector((state) => state.album);
  const allusers = useSelector((state) => state.allUsers);
  const user = useSelector((state) => state.session.user);

  allUsersArray = Object.values(allusers);
  allImagesArray = Object.values(images);
  allAlbumsArray = Object.values(albums);

  if (!user) {
    return (
      <>
        <div>{history.push("/404")}</div>
      </>
    );
  }
  if (returnState == true) {
    return (
      <div className="explore-container">
        <div className="images-container">
          <h2 className="explore-title">
            <button
              className="toggleResultsSearch"
              onClick={() => {
                setReturnState(!returnState);
              }}
            >
              {returnState == true ? (
                <div>Explore Images</div>
              ) : (
                <div>Explore Albums</div>
              )}
            </button>
          </h2>
          <div className="images-wrapper">
            {allImagesArr.map((image) => {
              return (
                <>
                  <div className="singleImgContainer" key={image.id}>
                    <Link to={`/images/${image.id}`}>
                      <img
                        className="single-img"
                        src={image.previewImageUrl}
                        alt=""
                      ></img>
                    </Link>
                    <div className="explore-image-bttm-section">
                      <div className="hide">{image.title}</div>

                      {/* likes and comments section */}
                      <div className="image-likes-container">
                        <span
                          className="ExitCommentsSection"
                          onClick={() => setCommentsModal(false)}
                        >
                          {commentsModal == true &&
                          imageState.id == image.id ? (
                            <div className="editArrowComment">
                              <i class="fa-solid fa-rectangle-xmark"></i>{" "}
                            </div>
                          ) : (
                            <i class=""></i>
                          )}
                        </span>

                        <div className="image-likes-section">
                          <div
                            id="star-icon-explore"
                            onClick={() => {
                              setCommentsModal(true);
                              setImageState(image);
                            }}
                          >
                            {commentsModal == true &&
                            imageState.id == image.id ? (
                              <i class="fa-solid fa-comment"></i>
                            ) : (
                              <div className="editArrowComment">
                                <i class="fa-regular fa-comment"></i>
                              </div>
                            )}{" "}
                            <div
                              className={
                                commentsModal && image.id == imageState.id
                                  ? "commentBox"
                                  : "hiddenComment"
                              }
                            >
                              {commentsModal == true && (
                                <ExploreImageComments
                                  users={allUsersArray}
                                  image={image}
                                  user={user}
                                  setCommentsModal={setCommentsModal}
                                  commentsModal={commentsModal}
                                  setSubmitted={setSubmitted}
                                  submitted={submitted}
                                  // setCommentsState={setCommentsState}
                                  // commentsState={commentsState}
                                />
                              )}
                            </div>
                          </div>

                          <div> {image.comments.length} </div>
                        </div>
                        <div className="image-likes-section">
                          <div id="star-icon-explore">
                            <ExploreImageLikes
                              image={image}
                              user={user}
                              setImageLiked={setImageLiked}
                              imageLiked={imageLiked}
                            />
                          </div>
                          <div> {image.likes.length} </div>
                        </div>
                      </div>
                      {/* likes and comments section */}
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
  if (returnState == false) {
    return (
      <div className="explore-container">
        <div className="images-container">
          <h2 className="explore-title">
            <button
              className="toggleResultsSearch"
              onClick={() => {
                setReturnState(!returnState);
              }}
            >
              {returnState == true ? (
                <div>Explore Images</div>
              ) : (
                <div>Explore Albums</div>
              )}
            </button>
          </h2>
          <div className="images-wrapper">
            {allAlbumsArray.map((album) => {
              return (
                <>
                  <div className="singleImgContainer" key={album.id}>
                    <Link to={`/albums/${album.id}`}>
                      <img
                        className="single-img"
                        src={album.previewImageUrl}
                        alt=""
                      ></img>
                    </Link>
                    <div className="explore-image-bttm-section">
                      <div className="hide">{album.title}</div>

                      {/* likes and comments section */}
                      <div className="image-likes-container">
                        {/* <span
                          className="ExitCommentsSection"
                          onClick={() => setCommentsModal(false)}
                        >
                          {commentsModal == true &&
                          imageState.id == image.id ? (
                            <div className="editArrowComment">
                              <i class="fa-solid fa-rectangle-xmark"></i>{" "}
                            </div>
                          ) : (
                            <i class=""></i>
                          )}
                        </span> */}

                        {/* <div className="image-likes-section">
                          <div
                            id="star-icon-explore"
                            onClick={() => {
                              setCommentsModal(true);
                              setImageState(image);
                            }}
                          >
                            {commentsModal == true &&
                            imageState.id == image.id ? (
                              <i class="fa-solid fa-comment"></i>
                            ) : (
                              <div className="editArrowComment">
                                <i class="fa-regular fa-comment"></i>
                              </div>
                            )}{" "}
                            <div
                              className={
                                commentsModal && image.id == imageState.id
                                  ? "commentBox"
                                  : "hiddenComment"
                              }
                            >
                              {commentsModal == true && (
                                <ExploreImageComments
                                  users={allUsersArray}
                                  image={image}
                                  user={user}
                                  setCommentsModal={setCommentsModal}
                                  commentsModal={commentsModal}
                                  setSubmitted={setSubmitted}
                                  submitted={submitted}
                                  // setCommentsState={setCommentsState}
                                  // commentsState={commentsState}
                                />
                              )}
                            </div>
                          </div>

                          <div> {image.comments.length} </div>
                        </div> */}
                        {/* <div className="image-likes-section">
                          <div id="star-icon-explore">
                            <ExploreImageLikes
                              image={image}
                              user={user}
                              setImageLiked={setImageLiked}
                              imageLiked={imageLiked}
                            />
                          </div>
                          <div> {image.likes.length} </div>
                        </div> */}
                      </div>
                      {/* likes and comments section */}
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
};

export default GetAllImages;
