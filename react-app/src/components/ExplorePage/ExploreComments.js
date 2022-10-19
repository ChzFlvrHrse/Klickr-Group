import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createLikesThunk, deleteLikesThunk } from "../../store/likes";

function ExploreImageCommments({ image, user, setCommentsModal, commentsModal, setCommentsState, commentsState}) {
const dispatch = useDispatch()
// filter out user like
let imageLikedByUser = image.likes.filter((filteredLikes, index) => filteredLikes.userId == user.id)
  const imageId = image.id
const toggleLikes = (e) => {
    e.preventDefault()
    console.log(image)
    setCommentsModal(!commentsModal)
    //   if (image != undefined && image != false) {
    //   if (imageLikedByUser.length == 0) {
    //     dispatch(createLikesThunk(image.id)).then(() => setImageLiked(!imageLiked))
    //   } else if (imageLikedByUser.length >= 1){
    //     dispatch(deleteLikesThunk(imageLikedByUser[0].id)).then(() => setImageLiked(!imageLiked))
    //   }
    // }
  };

  return (
    <>
          <div onClick={toggleLikes}>
              <h1>{commentsState.title}</h1>
            </div>
    </>
  );
}

export default ExploreImageCommments;
