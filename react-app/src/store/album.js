const GET_ALBUM = "album/getAlbum";
const GET_ONE_ALBUM = "album/getOneAlbum";
const NEW_ALBUM = "album/newAlbum";
const UPDATE_ALBUM = "album/update";
const DELETE_ALBUM = "album/delete";

const getAllAlbums = (albums) => {
  return {
    type: GET_ALBUM,
    albums,
  };
};

const getOneAlbum = (albumId) => {
  return {
    type: GET_ONE_ALBUM,
    albumId,
  };
};

const newAlbum = (album) => {
  return {
    type: NEW_ALBUM,
    album,
  };
};

const updateAlbum = (updated) => {
  return {
    type: UPDATE_ALBUM,
    updated,
  };
};

const deleteAlbum = (albumId) => {
  return {
    type: DELETE_ALBUM,
    albumId,
  };
};

export const getAlbumsThunk = () => async (dispatch) => {
  const response = await fetch("/api/albums/all");

  if (response.ok) {
    const albums = await response.json();
    dispatch(getAllAlbums(albums));
    return albums;
  }
};
export const getOneAlbumThunk = (albumId) => async (dispatch) => {
  const response = await fetch(`/api/albums/${albumId}`);

  if (response.ok) {
    const album = await response.json();
    dispatch(getOneAlbum(album));
    return album;
  }
};

export const newAlbumThunk = (userId, title, description, previewImageUrl) => async (dispatch) => {
  const response = await fetch("/api/albums/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({userId, title, description, previewImageUrl})
  });
  if (response.ok) {
    const createAlbum = await response.json();
    dispatch(newAlbum(createAlbum))
    return createAlbum;
  }
};

export const updateAlbumThunk = (userId, title, description, previewImageUrl, albumId) => async (dispatch) => {
  const response = await fetch(`/api/albums/${albumId}/edit`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({userId, title, description, previewImageUrl}),
  });
  if (response.ok) {
    const updatedAlbum = await response.json();
    dispatch(updateAlbum(updatedAlbum));
  }
};

export const deleteAlbumThunk = (albumId) => async (dispatch) => {
  const response = await fetch(`/api/albums/${albumId}/delete`, {
    method: "DELETE",
  });
  if (response.ok) {
    const deleted = await response.json();
    dispatch(deleteAlbum(deleted));
  }
};
const initialState = {};
const albumReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALBUM: {
      const newState = {}
      action.albums.albums.forEach((album)=> {
        newState[album.id] = album
      })
    // const newState = {...action.images}
      return newState;
    }
    case GET_ONE_ALBUM: {
      const newState = { ...action.albumId};
      return newState;
    }
    case NEW_ALBUM: {
      const newState = { ...state };
      newState[action.album.id] = action.album;
      return newState;
    }
    case UPDATE_ALBUM: {
      const newState = { ...state };
      newState[action.updated.id] = action.updated
      return newState;
    }
    case DELETE_ALBUM: {
      const newState = { ...state };
      delete newState[action.albumId]
      return newState;
    }
    default:
      return state;
  }
};

export default albumReducer;
