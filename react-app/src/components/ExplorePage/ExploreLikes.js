import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createLikesThunk, deleteLikesThunk } from "../../store/likes";

function ExploreImageLikes({ image, user, setImageLiked, imageLiked }) {
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
  };

  return (
    <>
          <div onClick={toggleLikes}>
          {(imageLikedByUser.length > 0) ? <i class="fa-solid fa-star"></i> : <i class="fa-regular fa-star"></i> }
            </div>
    </>
  );
}

export default ExploreImageLikes;
