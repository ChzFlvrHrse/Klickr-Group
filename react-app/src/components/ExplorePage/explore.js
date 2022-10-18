import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getImagesThunk } from '../../store/image'
import { Link, useParams } from 'react-router-dom'
import LogoutButton from '../auth/LogoutButton'
import { getAllUsersThunk } from "../../store/AllUsers";
import { getAllCommentsThunk, getImageCommentsThunk } from "../../store/comments";
import { getImageLikesThunk, createLikesThunk, deleteLikesThunk } from "../../store/likes";
import './explore.css';

const GetAllImages = () => {

    const allImages = useSelector(state => state.image);
    const allImagesArr = Object.values(allImages);

    const dispatch = useDispatch()
    const { id } = useParams();

    let allImagesArray;
    let allUsersArray;
    let allImagesFiltered;
    let imageOwner;
    let owner;


    useEffect(() => {
        dispatch(getImageLikesThunk(id))
    }, [dispatch, id])

    useEffect(() => {
        dispatch(getImagesThunk())
    }, [dispatch])
    const images = useSelector((state) => state.image);
    const likes = useSelector(state => state.likes);
    const allusers = useSelector((state) => state.allUsers);
    const user = useSelector((state) => state.session.user);
    
    
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

    allImagesArray = Object.values(images);
    allUsersArray = Object.values(allusers);

    if (allUsersArray && allImagesArray) {
        allImagesFiltered = allImagesArray.filter((filteredImages, index) => filteredImages.id == id)
    }
        // console.log(allImagesFiltered[0].created_at)
    
    if (allUsersArray.length && allImagesArray.length) {
      imageOwner = allUsersArray.filter(user => user.id == allImagesFiltered[0].userId)
      console.log(allImagesFiltered)
    }
        if (imageOwner && allImagesFiltered) {
            owner = imageOwner[0]
        }
    
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
    



    return (

        <div className="explore-container">
            <div className='images-container'>
            <h2 className='explore-title'>Explore</h2>
                <div className='images-wrapper'>
                    {allImagesArr.map((image) => (
                        <Link to={`/images/${image.id}`}>
                            <div className='singleImgContainer' key={image.id}>
                                <img className='single-img' src={image.previewImageUrl} alt=''></img>
                                <div className='hide'>
                                    {image.title}
                                    {filteredLikes.length ? <i class="fa-solid fa-star" onClick={toggleLikes} ></i> : <i class="fa-regular fa-star" onClick={toggleLikes}></i>}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default GetAllImages
