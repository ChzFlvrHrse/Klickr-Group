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
    const [showModal, setShowModal] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [commentState, setCommentState] = useState({});

    const dispatch = useDispatch();
    const { id } = useParams();
    //   variables
    let allImagesArray;
    let allUsersArray;
    let allImagesFiltered;
    let imageOwner;
    let owner;

    // useEffects
    useEffect(() => {
        dispatch(getImagesThunk());
    }, [dispatch, allImagesFiltered, allUsersArray]);

    useEffect(() => {
        dispatch(getAllUsersThunk());
    }, [dispatch, allImagesFiltered, allImagesArray]);

    useEffect(() => {
        dispatch(getImageLikesThunk(id))
    }, [dispatch, id])

    useEffect(() => {
        dispatch(getAllCommentsThunk());
    }, [dispatch, showModal, showModalEdit, commentState]);


    // redux states
    const images = useSelector((state) => state.image);
    const allusers = useSelector((state) => state.allUsers);
    const user = useSelector((state) => state.session.user);
    const likes = useSelector(state => state.likes);
    const comment = useSelector(state => state.comments)
    const userId = user.id;

    let likesArray = Object.values(likes);
    let filteredLikes;

    let commentsArray = Object.values(comment)
    let filteredComments = commentsArray.filter(comments => comments.imageId == id)
    // console.log(filteredComments)

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
    allUsersArray = Object.values(allusers);

    if (allUsersArray && allImagesArray) {
        allImagesFiltered = allImagesArray.filter((filteredImages, index) => filteredImages.id == id)
    }
    // console.log(allImagesFiltered[0].created_at)

    if (allUsersArray.length && allImagesArray.length) {
        imageOwner = allUsersArray.filter(user => user.id == allImagesFiltered[0].userId)
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



    //   else return everything
    return (
        <>
            <div id="details-image">
                <div id="back-explore">
                    <Link to="/" className='i'><i class="fa-solid fa-arrow-left"></i></Link>
                    <Link to="/">Back to explore</Link>
                </div>
                <div id="user-image">
                    <img id="user-imageDetails" src={allImagesFiltered[0].previewImageUrl} alt="" />
                </div>
                <div id="star-like">
                    {filteredLikes.length ? <i class="fa-solid fa-star" onClick={toggleLikes} ></i> : <i class="fa-regular fa-star" onClick={toggleLikes}></i>}
                    <Link to="/upload" ><i class="fa-solid fa-download" title='upload photo'></i></Link>
                </div>
            </div>
            <div id='image-info'>
                <div>

                    {owner && (<div id="user">{owner.first_name} {owner.last_name}</div>)}
                    <div id='title'>{allImagesFiltered[0].title}</div>
                    <div id="description">{allImagesFiltered[0].description}</div>
                    <div className="bottom-border"></div>
                    {filteredComments &&
                        filteredComments.map((comment, index) => {
                            return (
                                <div key={comment.id} className="comment-box">
                                    <br />
                                    {/* map through users array and display username if id matches userId */}
                                    <div>
                                        {allUsersArray &&
                                            allUsersArray.map((singleUser, index) => {
                                                return (
                                                    <div className="user-name">
                                                        {singleUser.id === comment.userId
                                                            ? singleUser.first_name + " " + singleUser.last_name
                                                            : ""}
                                                    </div>
                                                );
                                            })}
                                    </div>
                                    <div className="body">{comment.body}</div>
                                    <div>{comment.updated_at}</div>
                                    {/* edit comment */}
                                    <button
                                        // style={styles3}
                                        onClick={() => {
                                            setShowModalEdit(true);
                                        }}
                                    >
                                        {userId === comment.userId ? <button
                                            className="DeleteAlbumButton"
                                            id="DeleteCommentButton"
                                            onClick={() => {
                                                setShowModalEdit(true);
                                                setCommentState(comment)
                                            }}
                                        >
                                            Edit Comment
                                        </button> : <></>}
                                        {showModalEdit && (
                                            <Modal onClose={() => setShowModalEdit(false)}>
                                                <EditCommentForm
                                                    imageId={id}
                                                    userId={userId}
                                                    setShowModalEdit={setShowModalEdit}
                                                    oldComment={commentState}
                                                />
                                            </Modal>
                                        )}
                                    </button>
                                    
                                    <button
                                        // // style={styles4}
                                        onClick={() => {
                                            setShowModal(true);
                                        }}
                                    >
                                        {userId == comment.userId ? <button
                                            className="DeleteAlbumButton"
                                            id="DeleteCommentButton"
                                            onClick={() => {
                                                setShowModal(true);
                                                setCommentState(comment)
                                            }}
                                        >
                                            Delete Comment
                                        </button>:<></>}
                                        {showModal && (
                                            <Modal onClose={() => setShowModal(false)}>
                                                <DeleteCommentForm
                                                    imageId={id}
                                                    setShowModal={setShowModal}
                                                    comment={commentState}
                                                />
                                            </Modal>
                                        )}
                                    </button>
                                </div>
                            );
                        })}
                </div>
                <div id='faves'>
                    {likesArray.length}
                    <div className="tag">faves</div>
                </div>
                <div id='comment-talley'>
                    {filteredComments.length}
                    <div className="tag">comments</div>
                </div>
                <div id="date">
                    Uploaded on {allImagesFiltered[0].created_at}
                </div>
            </div>
        </>
    );
}

export default ImageDetails;
