import React from "react";
import { useDispatch } from "react-redux";
import { deleteATagThunk } from "../../store/tags";
import "./DeleteComment.css"

//  Be sure to import the modal contents
function DeleteTagForm({ imageId, setShowModal, tag, submitted, setSubmitted }) {
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(deleteATagThunk(imageId, tag.id));
    setShowModal(false);
  };
  const handleSubmit2 = async (e) => {
    e.preventDefault();
    setShowModal(false);
  };

  return (
    <div className="DeleteComment-outer">
      <form className="DeleteComment-inner" onSubmit={handleSubmit2} autoComplete="off">
        <h4 id="statement">Delete Tag</h4>
        <div></div>
        <h5 id="assurance">Are you sure you want to delete this Tag?</h5>
        <div className="deleteSongButtons">
          <button
            className="submitDeleteComment"
            onClick={handleSubmit}
            type="submit"
          >
            Delete
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

export default DeleteTagForm;
