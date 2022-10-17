// constant type keys

//get all comments and get all comments associated with an image.

const ALL_COMMENTS = 'comments/AllComments';
const IMAGE_COMMENTS = 'comments/ImageComments';
const CREATE_COMMENT = 'comments/createAComment';
const UPDATE_COMMENT = 'comments/updateAComment';
const DELETE_COMMENT = 'comments/deleteAComment';


//actions

const getAllComments = (comments) => ({
    type: ALL_COMMENTS,
    comments
})


const getImageComments = (imageId) => ({
    type: IMAGE_COMMENTS,
    imageId
})

const createAComment = (comment) => ({
    type: CREATE_COMMENT,
    comment
})

const updateAComment = (comment) => ({
    type: UPDATE_COMMENT,
    comment
})

const deleteAComment = (commentId) => ({
    type: DELETE_COMMENT,
    commentId
})

// Thunks

export const getAllCommentsThunk = () => async (dispatch) => {
    const response = await fetch(`/api/comments/all`)
    if (response.ok) {
        const allComments = await response.json()
        dispatch(getAllComments(allComments))
    }
}
export const getImageCommentsThunk = (imageId) => async (dispatch) => {
    const response = await fetch(`/api/images/${imageId}/comment`)
    if (response.ok) {
        const ImageComments = await response.json()
        dispatch(getImageComments(ImageComments))
    }
}

export const createACommentThunk = (userId, imageId, body) => async (dispatch) => {
    const response = await fetch(`/api/images/${imageId}/comment/new`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({userId, imageId, body})
    })
    if (response.ok) {
        const newComment = await response.json()
        dispatch(createAComment(newComment))
    }
}
export const updateACommentThunk = (imageId, id, userId, body) => async (dispatch) => {
    const response = await fetch(`/api/images/${imageId}/comment/${id}/edit`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({imageId, id, userId, body})
    })
    if (response.ok) {
        const editComment = await response.json()
        dispatch(updateAComment(editComment))
    }
}

export const deleteACommentThunk = (imageId, id) => async (dispatch) => {
    const response = await fetch(`/api/images/${imageId}/comment/${id}/delete`, {
        method: "DELETE",
    })
    if (response.ok) {
        const commentDelete = await response.json()
        dispatch(deleteAComment(id))
        return commentDelete
    }
}

// comments reducer
const initialState = {}
export default function reducer(state = initialState, action) {
    switch (action.type) {
      case ALL_COMMENTS: {
        // const newState = {}
        const newState = {...action.comments}
        // action.image.likes.forEach((like) => {
        //     newState[like.id] = like
        // })
        return newState
      }
      case IMAGE_COMMENTS: {
        // const newState = {}
        const newState = {...action.imageId}
        // action.image.likes.forEach((like) => {
        //     newState[like.id] = like
        // })
        return newState
      }
      case CREATE_COMMENT: {
        const newState = { ...state }
        newState[action.comment.id] = action.comment
        return newState
      }
      case UPDATE_COMMENT: {
        const newState = { ...state }
        newState[action.comment.id] = action.comment
        return newState
      }
      case DELETE_COMMENT: {
        const newState = { ...state }
        // delete newState[action.id]
        delete newState[action.id]
        return newState
      }
      default:
        return state;
    }
  }
