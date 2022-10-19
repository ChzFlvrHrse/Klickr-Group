import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getImagesThunk } from "../../store/image";

import { getAllUsersThunk } from "../../store/AllUsers";
import { createLikesThunk, deleteLikesThunk } from "../../store/likes";

import ExploreImageLikes from "./ExploreLikes";
import "./explore.css";

const GetAllImages = () => {
  // toggle likes button
  // likes length

  // comment section
  // Amount of comments

  const [commentState, setCommentState] = useState(false);

  // track whether like state has been changed
  const [imageLiked, setImageLiked] = useState(false);

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
                {/* <Link to={`/images/${image.id}`}> */}
                <div className="singleImgContainer" key={image.id}>
                  {/* <i class="fa-solid fa-star"></i> */}
                  <img
                    className="single-img"
                    src={image.previewImageUrl}
                    alt=""
                  ></img>
                  <div className="explore-image-bttm-section">
                    <div className="hide">{image.title}</div>

                    {/* likes and comments section */}
                    <div className="image-likes-section">
                      <div id="star-icon-explore">
                        <ExploreImageLikes
                          image={image}
                          user={user}
                          setImageLiked={setImageLiked}
                          imageLiked={imageLiked}
                        />
                      </div>
                    </div>
                    {/* likes and comments section */}
                    <div> {image.likes.length} </div>
                  </div>
                  {/* <div className="likes-star" */}
                </div>
                {/* </Link> */}
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GetAllImages;
