const GET_IMAGE = "image/getImage";
const GET_ONE_IMAGE = "image/getOneImage";
const NEW_IMAGE = "image/newImage";
const UPDATE_IMAGE = "image/update";
const DELETE_IMAGE = "image/delete";

const getAllImages = (images) => {
  return {
    type: GET_IMAGE,
    images,
  };
};

const getOneImage = (imageId) => {
  return {
    type: GET_ONE_IMAGE,
    imageId,
  };
};

const newImage = (image) => {
  return {
    type: NEW_IMAGE,
    image,
  };
};

const updateImage = (updated) => {
  return {
    type: UPDATE_IMAGE,
    updated,
  };
};

const deleteImage = (imageId) => {
  return {
    type: DELETE_IMAGE,
    imageId,
  };
};

export const getImagesThunk = () => async (dispatch) => {
  const response = await fetch("/api/explore/");

  if (response.ok) {
    const images = await response.json();
    dispatch(getAllImages(images));
    return images;
  }
};
export const getOneImageThunk = (imageId) => async (dispatch) => {
  const response = await fetch(`/api/images/${imageId}`);

  if (response.ok) {
    const image = await response.json();
    dispatch(getOneImage(image));
    return image;
  }
};

export const newImageThunk = (userId, title, description, previewImageUrl) => async (dispatch) => {
  const response = await fetch("/api/images/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({userId, title, description, previewImageUrl})
  });
  if (response.ok) {
    const createImage = await response.json();
    dispatch(newImage(createImage))
    return createImage;
  }
};

export const updateImageThunk = (userId, title, description, previewImageUrl, imageId) => async (dispatch) => {
  const response = await fetch(`/api/images/${imageId}/edit`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({userId, title, description, previewImageUrl}),
  });
  if (response.ok) {
    const updatedImage = await response.json();
    dispatch(updateImage(updatedImage));
  }
};

export const deleteImageThunk = (imageId) => async (dispatch) => {
  const response = await fetch(`/api/images/${imageId}/delete`, {
    method: "DELETE",
  });
  if (response.ok) {
    const deleted = await response.json();
    dispatch(deleteImage(deleted));
  }
};
const initialState = {};
const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_IMAGE: {
      const newState = {}
      action.images.images.forEach((image)=> {
        newState[image.id] = image
      })
    // const newState = {...action.images}
      return newState;
    }
    case GET_ONE_IMAGE: {
      const newState = { ...action.imageId};
      return newState;
    }
    case NEW_IMAGE: {
      const newState = { ...state };
      newState[action.image.id] = action.image;
      return newState;
    }
    case UPDATE_IMAGE: {
      const newState = { ...state };
      newState[action.updated.id] = action.updated
      return newState;
    }
    case DELETE_IMAGE: {
      const newState = { ...state };
      delete newState[action.imageId]
      return newState;
    }
    default:
      return state;
  }
};

export default imageReducer;
