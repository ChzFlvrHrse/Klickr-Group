import React, { useState, useEffect, Profiler } from "react";
import { useDispatch } from "react-redux";
import { createLikesThunk, deleteLikesThunk } from "../../store/likes";
import { getImagesThunk } from "../../store/image";

import "./ExploreComments.css";
import { Link } from "react-router-dom";
import { Modal } from "../../context/Modal";

import EditCommentForm from "../Comments/EditCommentForm";
import DeleteCommentForm from "../Comments/DeleteCommentForm";

function ExploreImageCommments({
  users,
  image,
  user,
  setCommentsModal,
  commentsModal,
  // setCommentsState,
  // commentsState,
}) {
  const dispatch = useDispatch();
  const [ownComment, setOwnComment] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);

  // useEffect(() => {
  //   dispatch(getImagesThunk());
  // }, [dispatch, showModalDelete, showModalEdit]);

  const toggleLikes = (e) => {
    e.preventDefault();
    console.log(users);
    // setCommentsModal(!commentsModal);
  };

  return (
    <>
      <div onClick={toggleLikes} className="CommentsBoxExploreContents">
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
                            <Link
                              to={`/users/${oneUser.id}`}>
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
                                // <Modal onClose={() => setShowModalEdit(false)}>
                                <EditCommentForm
                                  imageId={image.id}
                                  userId={user.id}
                                  setShowModalEdit={setShowModalEdit}
                                  oldComment={comment}
                                />
                                // </Modal>
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
        <div className="BottomPartExplorePageCommentBox"></div>
      </div>
    </>
  );
}

export default ExploreImageCommments;
