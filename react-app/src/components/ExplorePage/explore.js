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
import {
  getAllLikesThunk,
  createLikesThunk,
  deleteLikesThunk,
} from "../../store/likes";
import "./explore.css";

const GetAllImages = () => {
  const id = 4;

  // toggle likes button
  // likes length

  // comment section
  // Amount of comments

  const [commentState, setCommentState] = useState(false);
  const [likeState, setLikesState] = useState(false);

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

  useEffect(() => {
    dispatch(getAllLikesThunk());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllCommentsThunk());
  }, [dispatch]);

  const images = useSelector((state) => state.image);
  const likes = useSelector((state) => state.likes);
  const allusers = useSelector((state) => state.allUsers);
  const user = useSelector((state) => state.session.user);
  const comments = useSelector((state) => state.comments);

  
  likesArray = Object.values(likes);
  allUsersArray = Object.values(allusers);
  allImagesArray = Object.values(images);
  commentsArray = Object.values(comments);

  

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
                    <div className="hide">{image.title}</div>
                    <div className="hide">{user.first_name}</div>
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
