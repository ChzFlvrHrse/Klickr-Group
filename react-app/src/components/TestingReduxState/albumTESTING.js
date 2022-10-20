import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Modal } from "../../context/Modal";

import { getAlbumsThunk } from "../../store/album";
import { getOneAlbumThunk } from "../../store/album";
import EditAlbumForm from "../Albums/EditAlbumForm";
import DeleteAlbumForm from "../Albums/DeleteAlbumForm";
import CreateAlbumForm from "../Albums/createAlbum";
import { getAllUsersThunk } from "../../store/AllUsers";

export default function TestingAlbums() {
  const { albumId } = useParams();
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);

  let allAlbumsArray;
  const [albumState, setAlbumState] = useState({});


  useEffect(() => {
    dispatch(getAlbumsThunk());
  }, [dispatch, albumState, showModal, showModalEdit, allAlbumsArray]);

  useEffect(() => {
    dispatch(getAllUsersThunk());
  }, [dispatch]);

  const albums = useSelector((state) => state.album);
    allAlbumsArray = Object.values(albums)
  const allusers = useSelector((state) => state.allUsers);
  const allUsersArray = Object.values(allusers);

  var styles1 = {
    color: "Black",
    backgroundColor: "pink",
    fontWeight: "bold",
    height: "100px",
    width: "100px",
  };

  var styles3 = {
    color: "Black",
    backgroundColor: "lavender",
    fontWeight: "bold",
    height: "100px",
    width: "100px",
  };

  const containerStyle = {
   width: "100%",
   height: "100%",
   display: "flex",
   flexDirection: "column",
   justifyContent: "center"
  }

  return (
    <>
      <div className="CommentTESTINGCONTAINER" style={containerStyle}>
        <div>
          <button style={styles1} onClick={() => dispatch(getAlbumsThunk())}>
            Get all Albums
          </button>
        </div>
        <div>
          <button
            style={styles3}
            onClick={() => dispatch(getOneAlbumThunk(albumId))}
          >
            Get One Album
          </button>
        </div>
        <div>
          <CreateAlbumForm />
        </div>
        <div className="CommentsArraymapped">
        {allAlbumsArray &&
          allAlbumsArray.map((album, index) => {
            return (
              <div key={album.id} className="CommentContainer">
                <br />
                {/* map through users array and display username if id matches userId */}
                <div>
                  {allUsersArray &&
                    allUsersArray.map((singleUser, index) => {
                      return (
                        <div>
                          {singleUser.id === album.userId
                            ? singleUser.username
                            : ""}
                        </div>
                      );
                    })}
                </div>
                <div>{album.title}</div>
                <div>{album.description}</div>
                <div>{album.previewImageUrl}</div>
                <div>{album.updated_at}</div>
                {/* edit image */}
                <button
                  style={styles3}
                  onClick={() => {
                    setShowModalEdit(true);
                  }}
                    >
                  <button
                    className="DeleteAlbumButton"
                    id="DeleteCommentButton"
                    onClick={() => {
                        setShowModalEdit(true);
                      setAlbumState(album)
                    }}
                  >
                    Edit Album
                  </button>
                  {showModalEdit && (
                  <Modal onClose={() => setShowModalEdit(false)}>
                    <EditAlbumForm
                      albumId={albumState.id}
                      setShowModalEdit={setShowModalEdit}
                      oldAlbum={albumState}
                    />
                  </Modal>
                  )}
                </button>
                {/* edit comment */}

                {/* delete comment */}
                <button
                  style={styles3}
                  onClick={() => {
                    setShowModal(true);
                  }}
                    >
                  <button
                    className="DeleteAlbumButton"
                    id="DeleteCommentButton"
                    onClick={() => {
                      setShowModal(true);
                      setAlbumState(album)
                    }}
                  >
                    Delete Album
                  </button>
                  {showModal && (
                  <Modal onClose={() => setShowModal(false)}>
                    <DeleteAlbumForm
                      setShowModal={setShowModal}
                      album={albumState}
                    />
                  </Modal>
                  )}
                </button>
              </div>
            );
          })}
      </div>
      </div>
    </>
  );
}
