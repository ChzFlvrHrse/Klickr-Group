import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getImagesThunk } from "../../store/image";
import { Link, useParams } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import { getAllUsersThunk } from "../../store/AllUsers";
import {
  getAllCommentsThunk,
  getImageCommentsThunk,
} from "../../store/comments";
import { createLikesThunk, deleteLikesThunk } from "../../store/likes";
import "./explore.css";

const GetAllImages = () => {
  // toggle likes button
  // likes length

  // comment section
  // Amount of comments

  const [commentState, setCommentState] = useState(false);
  const [imageLikesState, setimageLikesState] = useState(false);

  const allImages = useSelector((state) => state.image);
  const allImagesArr = Object.values(allImages);

  const dispatch = useDispatch();

  let allImagesArray;
  let allUsersArray;
  let commentsArray;
  let likesArray;

  // useEffect(() => {
  //     dispatch(getImageLikesThunk(id))
  // }, [dispatch, id])

  useEffect(() => {
    dispatch(getImagesThunk());
  }, [dispatch, allUsersArray]);
  // getting all users

  useEffect(() => {
    dispatch(getAllUsersThunk());
  }, [dispatch, allUsersArray]);

  const images = useSelector((state) => state.image);
  const allusers = useSelector((state) => state.allUsers);
  const user = useSelector((state) => state.session.user);

  allUsersArray = Object.values(allusers);
  allImagesArray = Object.values(images);

  const toggleLikes = (e, image) => {
    e.preventDefault();
    console.log(imageLikesState);
    // if (!imageLikesState.likes.length) {
    //   dispatch(createLikesThunk(imageLikesState.id));
    // } else {
    //   dispatch(deleteLikesThunk(imageLikesState.likes.id));
    // }
  };

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
                    <i class="fa-solid fa-star"></i>
                    <img
                      className="single-img"
                      src={image.previewImageUrl}
                      alt=""
                    ></img>
                    <div className="explore-image-bttm-section">
                      <div className="hide">{image.title}</div>
                      <div className="image-likes-section">
                        <div
                          id="star-icon-explore"
                          onClick={toggleLikes}
                          // onClick={() => {
                          //   setimageLikesState(image, () => {
                          //     toggleLikes();
                          //   });
                          // }}
                          >
                          <i class="fa-regular fa-star"></i>
                        </div>
                        <div> {image.likes.length} </div>
                      </div>
                    </div>
                    {/* <div className="likes-star" */}
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

// {likesArray &&
//   likesArray.map((like) => {
//     return (
//       <>
//         <div key={like.id} className="explore-like-container">
//             {like.userId == image.userId ? like.id : ""}
//
//         </div>
//       </>
//     );
//   })}‹
