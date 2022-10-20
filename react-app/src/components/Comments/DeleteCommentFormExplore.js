import React from "react";
import { useDispatch } from "react-redux";
import { deleteACommentThunk } from "../../store/comments";

/*



!!!!this form is for the explore page comments section




*/

//  Be sure to import the modal contents
function DeleteCommentFormExplore({ imageId, setShowModal, comment, submitted, setSubmitted }) {
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(deleteACommentThunk(imageId, comment.id)).then(()=> setSubmitted(!submitted));
    setShowModal(false);
  };
  const handleSubmit2 = async (e) => {
    e.preventDefault();
    setShowModal(false);
  };

  return (
    <div className="DeleteComment-outer">
      <form className="DeleteComment-inner" onSubmit={handleSubmit2} autoComplete="off">
        <h1>Warning! This will permanently remove the comment.</h1>
        <div></div>
        <h2>Are you sure you want to delete?</h2>
        <div className="deleteSongButtons">
          <button
            className="submitDeleteComment"
            onClick={handleSubmit}
            type="submit"
          >
            Delete comment
          </button>
          <button
            className="cancelDeleteComment"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default DeleteCommentFormExplore;
