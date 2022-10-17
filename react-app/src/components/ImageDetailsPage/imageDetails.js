import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getOneImageThunk, getImagesThunk } from '../../store/image';
import EditImageForm from "../ImagesForms/EditImageForm";
import DeleteImageForm from "../ImagesForms/DeleteImageForm";
import CreateCommentForm from "../Comments/CreateCommentForm";
import EditCommentForm from "../Comments/EditCommentForm";
import DeleteCommentForm from "../Comments/DeleteCommentForm";
import { getAllUsersThunk } from "../../store/AllUsers";
import { getAllCommentsThunk, getImageCommentsThunk } from "../../store/comments";
import { getImageLikesThunk, createLikesThunk, deleteLikesThunk } from "../../store/likes";
import { Modal } from "../../context/Modal";
import "./imageDetails.css"

function ImageDetails() {

    const dispatch = useDispatch();
    const { id } = useParams();
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
        dispatch(getImageLikesThunk(id))
    }, [dispatch])

    useEffect(() => {
        dispatch(getAllCommentsThunk());
    }, [dispatch]);


    // redux states
    const images = useSelector((state) => state.image);
    const allusers = useSelector((state) => state.allUsers);
    const user = useSelector((state) => state.session.user);
    const likes = useSelector(state => state.likes);

    let likesArray = Object.values(likes);
    let filteredLikes;

    filteredLikes = likesArray.filter((filteredLikes, index) => filteredLikes.userId == user.id)
    const userLikeId = filteredLikes[0]
    // console.log(userLikeId)
    // toggle likes on and off (post and delete)
    const toggleLikes = (e) => {
        e.preventDefault();
        if (!filteredLikes.length) {
            dispatch(createLikesThunk(id))
        }
        else {
            dispatch(deleteLikesThunk(userLikeId.id))
        }

    };

    // filters
    allImagesArray = Object.values(images);
    const allUsersArray = Object.values(allusers);

    allImagesFiltered = allImagesArray.filter((filteredImages, index) => filteredImages.id == id)
    // console.log(allImagesFiltered[0])

    let imageOwner = allUsersArray.filter(user => user.id == allImagesFiltered[0].userId)
    let owner = imageOwner[0]

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



    //   else return everything
    return (
        <>
            <div id="details-image">
                <div id="back-explore">
                    <Link to="/" className='i'><i class="fa-solid fa-arrow-left"></i></Link>
                    <Link to="/">Back to explore</Link>
                </div>
                <div id="user-image">
                    <img src={allImagesFiltered[0].previewImageUrl} />
                </div>
                <div id="star-like">
                    {filteredLikes.length ? <i class="fa-solid fa-star" onClick={toggleLikes}></i> : <i class="fa-regular fa-star" onClick={toggleLikes}></i>}
                    <Link to="/upload"><i class="fa-solid fa-download"></i></Link>
                </div>
            </div>
            <div id='image-info'>
                <div>
                    {owner && (<h1>{owner.username}</h1>)}
                </div>
            </div>
        </>
    );
}

export default ImageDetails;
