
const GETIMAGELIKES = 'likes/GETIMAGELIKES';
const CREATE_LIKES = 'likes/CREATELIKES';
const DELETE_LIKES = 'likes/DELETELIKES';


const getImageLikes = (imageId) => ({
    type: GETIMAGELIKES,
    imageId
})


const createLikes = (payload) => ({
    type: CREATE_LIKES,
    payload
})

const deleteLikes = (id) => ({
    type: DELETE_LIKES,
    id
})

export const getImageLikesThunk = (imageId) => async (dispatch) => {
    const response = await fetch(`/api/images/${imageId}/likes`, {
    })
    if (response.ok) {
        const likes = await response.json()
        dispatch(getImageLikes(likes))
    }
}

export const createLikesThunk = (imageId,payload) => async (dispatch) => {
    const response = await fetch(`/api/images/${imageId}/likes/new`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const likes = await response.json()
        dispatch(createLikes(likes))
    }
}

export const deleteLikesThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/likes/${id}/delete`, {
    // const response = await fetch(`/api/images/:imageId/likes/${id}/delete`, {
        method: "DELETE",
    });
    if (response.ok) {
        const likes = await response.json()
        await dispatch(deleteLikes(id))
        return likes
    }
}
const initialState = {}
export default function reducer(state = initialState, action) {
    switch (action.type) {
      case GETIMAGELIKES: {
        // const newState = {}
        const newState = {...action.imageId}
        // action.image.likes.forEach((like) => {
        //     newState[like.id] = like
        // })
        return newState
      }
      case CREATE_LIKES: {
        const newState = { ...state }
        newState[action.payload.id] = action.payload
        return newState
      }
      case DELETE_LIKES: {
        const newState = { ...state }
        delete newState[action.id]
        return newState
      }
      default:
        return state;
    }
  }
