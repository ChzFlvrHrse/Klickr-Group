import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getImagesThunk } from "../../store/image";
import { Link } from "react-router-dom";
import { getAllUsersThunk } from "../../store/AllUsers";
import { Modal } from "../../context/Modal";
import ExploreImageLikes from "./ExploreLikes";
import ExploreImageCommments from "./ExploreComments";
import "./explore.css";

const GetAllImages = () => {
  // fix delay on liking image, fix bug where spamming creates more likes (bypasses frontend validation)

  // comment section
  // Amount of comments

  // track whether like state has been changed
  const [imageLiked, setImageLiked] = useState(false);

  // track whether comments state is changed
  const [commentsState, setCommentsState] = useState(false);
  // track whether comments section is opened for user
  const [commentsModal, setCommentsModal] = useState(false);

  const allImages = useSelector((state) => state.image);
  const allImagesArr = Object.values(allImages);

  const dispatch = useDispatch();
  let allImagesArray;
  let allUsersArray;

  useEffect(() => {
    dispatch(getImagesThunk());
  }, [dispatch, allUsersArray, allImagesArray, imageLiked]);
  // getting all users

  useEffect(() => {
    dispatch(getAllUsersThunk());
  }, [dispatch, allUsersArray]);

  const images = useSelector((state) => state.image);
  const allusers = useSelector((state) => state.allUsers);
  const user = useSelector((state) => state.session.user);

  allUsersArray = Object.values(allusers);
  allImagesArray = Object.values(images);

  return (
    <div className="explore-container">
      <div className="images-container">
        <h2 className="explore-title">Explore</h2>
        <div className="images-wrapper">
          {allImagesArr.map((image) => {
            return (
              <>
                <Link to={`/images/${image.id}`}>
                <div className="singleImgContainer" key={image.id}>
                  <img
                    className="single-img"
                    src={image.previewImageUrl}
                    alt=""
                  ></img>
                  <div className="explore-image-bttm-section">
                    <div className="hide">{image.title}</div>

                    {/* likes and comments section */}
                    <div className="image-likes-container">
                      <div className="image-likes-section"
                      //  onClick={() => setCommentsModal(true)}
                       >
                        <div
                          id="star-icon-explore"
                        >
                          {commentsModal == true ? (
                            <i class="fa-solid fa-comment"></i>
                          ) : (
                            <i class="fa-regular fa-comment"></i>
                          )}

                          {commentsModal && (
                            <Modal onClose={() => setCommentsModal(false)}>
                              <ExploreImageCommments
                                image={image}
                                user={user}
                                setCommentsModal={setCommentsModal}
                                commentsModal={commentsModal}
                                setCommentsState={setCommentsState}
                                commentsState={commentsState}
                              />
                            </Modal>
                          )}
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
                </Link>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GetAllImages;
