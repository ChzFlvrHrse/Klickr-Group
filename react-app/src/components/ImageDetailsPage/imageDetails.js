import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";
import { getOneImageThunk, getImagesThunk } from '../../store/image';
import EditImageForm from "../ImagesForms/EditImageForm";
import DeleteImageForm from "../ImagesForms/DeleteImageForm";
import CreateCommentForm from "../Comments/CreateCommentForm";
import EditCommentForm from "../Comments/EditCommentForm";
import DeleteCommentForm from "../Comments/DeleteCommentForm";
import { getAllUsersThunk } from "../../store/AllUsers";
import { createACommentThunk, deleteACommentThunk, getAllCommentsThunk, getImageCommentsThunk } from "../../store/comments";
import { getImageLikesThunk, createLikesThunk, deleteLikesThunk } from "../../store/likes";
import { Modal } from "../../context/Modal";
import "./imageDetails.css"

function ImageDetails() {
    const [showModal, setShowModal] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [commentState, setCommentState] = useState({});
    const [body, setBody] = useState("")
    let [commDelete, setCommDelete] = useState(1);

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
    }, [dispatch, showModal, showModalEdit, commentState, commDelete]);


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

    // handle comment submission
    const submitComment = async (e) => {
        e.preventDefault()

        if (body.length) {
            await dispatch(createACommentThunk(userId, id, body))
            setBody("")
        } else {
            return "Bad Data"
        }
    }

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
                    <Link to="/explore">Back to explore</Link>
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
                        filteredComments.map(comment => {
                            return (
                                <div key={comment.id} className="comment-box">
                                    <br />
                                    {/* map through users array and display username if id matches userId */}
                                    <div>
                                        {allUsersArray &&
                                            allUsersArray.map((singleUser) => {
                                                return (
                                                    <div className="user-name">
                                                        {singleUser.id == comment.userId
                                                            ? <Link to="#" className="profile-link">{singleUser.first_name + " " + singleUser.last_name}</Link>
                                                            : ""}
                                                        {singleUser.id == comment.userId ? <div className="comment-date">{comment.updated_at}</div> : <></>}
                                                        <div className="edit-delete">
                                                            {singleUser.id == comment.userId && singleUser.id == userId ? <i onClick={() => { setShowModalEdit(true); setCommentState(comment) }} className="edit-comment" title="edit comment" class="fa-solid fa-pen-to-square"></i> : <></>}
                                                            {singleUser.id == comment.userId && singleUser.id == userId ? <i onClick={async (e) => { e.preventDefault(); await dispatch(deleteACommentThunk(id, comment.id)); setCommDelete(commDelete++) }} className="delete-comment" title='delete' class="fa-solid fa-delete-left"></i> : <></>}
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
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                    </div>
                                    <div className="body">{comment.body}</div>
                                </div>
                            );
                        })}
                    <div id="create-comment">
                        <form
                            onSubmit={submitComment}
                        >
                            <textarea
                                id="comment-here"
                                placeholder="Add a comment"
                                tabIndex='0'
                                type='text'
                                onChange={event => setBody(event.target.value)}
                                value={body}
                            ></textarea>
                            <div id="submit-container">
                                <button
                                    type='submit'
                                    id="submit-comment"
                                >Comment</button>
                            </div>
                        </form>
                    </div>
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
                {/* <div className="bottom-border-2">

                </div> */}
            </div>
        </>
    );
}

export default ImageDetails;
