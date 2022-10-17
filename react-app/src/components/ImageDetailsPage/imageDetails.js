// import { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useParams, useHistory, Link } from "react-router-dom";
// import { getOneImageThunk } from '../../store/image';
// import "./imageDetails.css"

// function ImageDetails() {
//     const image = useSelector(state => state.image)

//     const { id } = useParams()

//     const dispatch = useDispatch()

//     useEffect(() => {
//         dispatch(getOneImageThunk(id))
//     }, [dispatch])

//     return (
//         <div id="details-container">
//             <div id="back-explore">
//                 <Link to="/" className='i'><i class="fa-solid fa-arrow-left"></i></Link>
//                 <Link to="/">Back to explore</Link>
//             </div>
//             <div>
//                 <img src={image.previewImageUrl} />
//             </div>
//         </div>
//     )
// }

// export default ImageDetails;
import "./imageDetails.css";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Modal } from "../../context/Modal";

import { getAllUsersThunk } from "../../store/AllUsers";
import { getImagesThunk, getOneImageThunk } from "../../store/image";
import {
  getAllCommentsThunk,
  getImageCommentsThunk,
} from "../../store/comments";
import {
  getImageLikesThunk,
  createLikesThunk,
  deleteLikesThunk,
} from "../../store/likes";

import EditImageForm from "../ImagesForms/EditImageForm";
import DeleteImageForm from "../ImagesForms/DeleteImageForm";
import CreateCommentForm from "../Comments/CreateCommentForm";
import EditCommentForm from "../Comments/EditCommentForm";
import DeleteCommentForm from "../Comments/DeleteCommentForm";

export function ImageDetails() {
  const dispatch = useDispatch();
  const { imageId } = useParams();
  //   variables
  let allImagesArray;
  let allImagesFiltered;
  // useEffects
  useEffect(() => {
    dispatch(getImagesThunk());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllUsersThunk());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getImageLikesThunk(imageId))
 }, [dispatch])

 useEffect(() => {
  dispatch(getAllCommentsThunk());
}, [dispatch]);

  // redux states
  const images = useSelector((state) => state.image);
  const allusers = useSelector((state) => state.allUsers);
  const user = useSelector((state) => state.session.user);
  // filters
  allImagesArray = Object.values(images);
  const allUsersArray = Object.values(allusers);

  allImagesFiltered = allImagesArray.filter((filteredImages, index) => filteredImages.id == imageId)
// if image does not exist
  if (!allImagesFiltered.length) {
    return (
        <>
        <div>
            Sorry this image does not exist!
        </div>
        </>
    )
  }



  // else return everything
  return (
    <>
      <div className="ImageDetailsEntireContainerOuter">
        <div className="ImageDetailsUpperHalfContainer">
          <h1>Let's Get Started</h1>
        </div>
        <div className="ImageDetailsLowerHalfContainer">
          <h1>Let's Finish This</h1>
        </div>
      </div>
    </>
  );
}
