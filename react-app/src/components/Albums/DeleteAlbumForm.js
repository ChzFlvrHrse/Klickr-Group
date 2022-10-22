import React from "react";
import { useDispatch } from "react-redux";
import { deleteAlbumThunk } from "../../store/album";
import { useHistory } from "react-router-dom";
import './DeleteAlbumForm.css'

//  Be sure to import the modal contents
function DeleteAlbumForm({setShowModal, album }) {
  const dispatch = useDispatch();
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(deleteAlbumThunk(album.id));
    setShowModal(false);
    history.push('/explore')
  };
  const handleSubmit2 = async (e) => {
    e.preventDefault();
    setShowModal(false);
  };

  return (
    <div className="DeleteImage-outer">
      <form className="DeleteComment-inner" onSubmit={handleSubmit2} autoComplete="off">
        <h4 id="statement">Warning! This will permanently remove the album.</h4>
        <div></div>
        <h5 id="assurance">Are you sure you want to delete?</h5>
        <div className="deleteSongButtons">
          <button
            className="submitDeleteComment"
            onClick={handleSubmit}
            type="submit"
          >
            Delete album
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

export default DeleteAlbumForm;
