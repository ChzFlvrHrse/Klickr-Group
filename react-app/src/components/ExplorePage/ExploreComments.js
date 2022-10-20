import React, { useState, useEffect, Profiler } from "react";
import { useDispatch } from "react-redux";
import { createLikesThunk, deleteLikesThunk } from "../../store/likes";
import { getImagesThunk } from "../../store/image";

import "./ExploreComments.css";
import { Link } from "react-router-dom";
import { Modal } from "../../context/Modal";

import EditCommentFormExplore from "../Comments/EditCommentFormExplore";
// import DeleteCommentFormExplore from "../Comments/DeleteCommentFormExplore";
import { createACommentThunk } from "../../store/comments";
import DeleteCommentFormExplore from "../Comments/DeleteCommentFormExplore";

function ExploreImageComments({
  users,
  image,
  user,
  setCommentsModal,
  commentsModal,
  setSubmitted,
  submitted,
  // setCommentsState,
  // commentsState,
}) {
  const dispatch = useDispatch();
  const [ownComment, setOwnComment] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [body, setBody] = useState("");

  // useEffect(() => {
  //   dispatch(getImagesThunk());
  // }, [dispatch, showModalDelete, showModalEdit]);
  console.log(commentsModal)

  // handle comment submission
  const submitComment = async (e) => {
    e.preventDefault();

    if (body.length) {
      await dispatch(createACommentThunk(user.id, image.id, body)).then(() =>
        setSubmitted(!submitted)
      );
      setBody("");
    } else {
      return "Bad Data";
    }
  };

  return (
    <>
      <div
        className="CommentsBoxExploreContents"
      >
        <div className="ExplorePageTopHalfCommentsBox">
          {image.comments.map((comment, index) => {
            return (
              <div key={comment.id} className="CommentOverallExploreContainer">
                <div className="allCommentsContainerExplorePage">
                  {users.map((oneUser) => {
                    return (
                      <>
                        {oneUser.id == comment.userId && (
                          <div className="ProfilePictureCommentsContainerExplore">
                            <Link to={`/users/${oneUser.id}`}>
                              <img
                                className="CommentsContainerUserProfilePicture"
                                src={oneUser.previewImageUrl}
                                alt="userprofile"
                              />
                            </Link>
                          </div>
                        )}
                      </>
                    );
                  })}
                  <div className="TextBoxContainerinExploreUpper">
                    {users.map((oneUser) => {
                      return (
                        <>
                          <div
                            className="userContainerforExploreModal"
                            id={oneUser.id}
                          >
                            <Link
                              to={`/users/${oneUser.id}`}
                              className="userfullnameExploreCommentsModal"
                            >
                              {oneUser.id == comment.userId
                                ? `${oneUser.first_name}  ${oneUser.last_name}`
                                : ""}
                            </Link>
                            <div className="userContainerExploreEditDelete">
                              {comment.userId == oneUser.id &&
                              comment.userId == user.id ? (
                                <i
                                  onClick={() => {
                                    setShowModalEdit(true);
                                  }}
                                  className="edit-comment"
                                  title="edit comment"
                                  class="fa-solid fa-pen-to-square"
                                ></i>
                              ) : (
                                ""
                              )}
                              {showModalEdit && (
                                <Modal onClose={() => setShowModalEdit(false)}>
                                  <EditCommentFormExplore
                                    imageId={image.id}
                                    userId={user.id}
                                    setShowModalEdit={setShowModalEdit}
                                    oldComment={comment}
                                    setSubmitted={setSubmitted}
                                    submitted={submitted}
                                  />
                                </Modal>
                              )}
                              {/* delete modal */}
                              {comment.userId == oneUser.id &&
                              comment.userId == user.id ? (
                                <i
                                  onClick={() => {
                                    setShowModalDelete(true);
                                  }}
                                  className="delete-comment"
                                  title="delete comment"
                                  class="fa-solid fa-delete-left"
                                ></i>
                              ) : (
                                ""
                              )}
                              {showModalDelete && (
                                <Modal
                                  onClose={() => setShowModalDelete(false)}
                                >
                                  <DeleteCommentFormExplore
                                    imageId={image.id}
                                    setShowModal={setShowModalDelete}
                                    comment={comment}
                                    setSubmitted={setSubmitted}
                                    submitted={submitted}
                                  />
                                </Modal>
                              )}
                            </div>
                          </div>
                        </>
                      );
                    })}

                    <div className="CommentBodyContainerExplorePage">
                      {comment.body}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>


        <div className="BottomPartExplorePageCommentBoxContainer">

        <div className="BottomPartExplorePageCommentBox">
          <div className="ProfilePictureCommentsContainerExploreBottom">
            <Link to={`/users/${user.id}`}>
              <img
                className="CommentsContainerUserProfilePictureBottom"
                src={user.previewImageUrl}
                alt="userprofile"
              />
            </Link>
          </div>
          <div id="create-comment">
            <form onSubmit={submitComment}>
              <textarea
                className="textareacommentbox"
                id="comment-here"
                placeholder="Add a comment"
                tabIndex="0"
                type="text"
                onChange={(event) => setBody(event.target.value)}
                value={body}
              ></textarea>
              <div id="submit-container">
                <button type="submit" id="submit-comment">
                  Comment
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* <span onClick={toggleComments} id="closeCommentSectionButton">
        <i class="fa-solid fa-rectangle-xmark"></i>
        </span> */}
        </div>
      </div>
    </>
  );
}

export default ExploreImageComments;
