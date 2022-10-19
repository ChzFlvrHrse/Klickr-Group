import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createLikesThunk, deleteLikesThunk } from "../../store/likes";

// solid like
{/* <i class="fa-solid fa-star"></i> */}
// normal like
{/* <i class="fa-regular fa-star"></i> */}


// pass in userId and imageId into createComment form so we aren't relying
// on useParams for imageId (will help when building a comment section for each photo in explore page)
function ExploreImageLikesComments({ image, user, setImageLiked, imageLiked }) {
const dispatch = useDispatch()
// filter out user like
let imageLikedByUser = image.likes.filter((filteredLikes, index) => filteredLikes.userId == user.id)
  const toggleLikes = (e) => {
    e.preventDefault()
      if (image != undefined && image != false) {
      if (imageLikedByUser.length == 0) {
        dispatch(createLikesThunk(image.id)).then(() => setImageLiked(!imageLiked))
      } else if (imageLikedByUser.length >= 1){
        dispatch(deleteLikesThunk(imageLikedByUser[0].id)).then(() => setImageLiked(!imageLiked))
      }
    }

    // onClick={async (e) => {e.preventDefault(); forceRerender+=1; setImageLikesState(image); toggleLikes();}} className="delete-comment"
    // onClick={async (e) => {e.preventDefault(); forceRerender+=1; setImageLikesState(image); toggleLikes();forceRerender+=1;}} className="delete-comment"
  };

  return (
    <>
          <div onClick={toggleLikes}>
          {(imageLikedByUser.length > 0) ? <i class="fa-solid fa-star"></i> : <i class="fa-regular fa-star"></i> }
            </div>
    </>
  );
}

export default ExploreImageLikesComments;
