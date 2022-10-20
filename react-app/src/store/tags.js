// constant type keys

//get all comments and get all comments associated with an image.

const ALL_TAGS = 'tags/AllTags';
const IMAGE_TAGS = 'tags/ImageTags';
const CREATE_TAGS = 'tags/createATag';
const UPDATE_TAGS = 'tags/updateATag';
const DELETE_TAGS = 'comments/deleteATag';


//actions

const getAllTags = (tags) => ({
    type: ALL_TAGS,
    tags
})


const getImageTags = (imageId) => ({
    type: IMAGE_TAGS,
    imageId
})

const createATag = (tag) => ({
    type: CREATE_TAGS,
    tag
})

const updateATag = (tag) => ({
    type: UPDATE_TAGS,
    tag
})

const deleteATag = (tagId) => ({
    type: DELETE_TAGS,
    tagId
})

// Thunks

export const getAllTagsThunk = () => async (dispatch) => {
    const response = await fetch(`/api/tags/all`)
    if (response.ok) {
        const AllTags = await response.json()
        dispatch(getAllTags(AllTags))
    }
}
export const getImageTagsThunk = (imageId) => async (dispatch) => {
    const response = await fetch(`/api/images/${imageId}/tag`)
    if (response.ok) {
        const ImageTags = await response.json()
        dispatch(getImageTags(ImageTags))
    }
}

export const createATagThunk = (userId, imageId, body) => async (dispatch) => {
    const response = await fetch(`/api/images/${imageId}/tag/new`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({userId, imageId, body})
    })
    if (response.ok) {
        const newTag = await response.json()
        dispatch(createATag(newTag))
    }
}
export const updateATagThunk = (imageId, id, userId, body) => async (dispatch) => {
    const response = await fetch(`/api/images/${imageId}/tag/${id}/edit`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({imageId, id, userId, body})
    })
    if (response.ok) {
        const editTag = await response.json()
        dispatch(updateATag(editTag))
    }
}

export const deleteATagThunk = (imageId, id) => async (dispatch) => {
    const response = await fetch(`/api/images/${imageId}/tag/${id}/delete`, {
        method: "DELETE",
    })
    if (response.ok) {
        const tagDelete = await response.json()
        dispatch(deleteATag(id))
        return tagDelete
    }
}

// comments reducer
const initialState = {}
export default function reducer(state = initialState, action) {
    switch (action.type) {
      case ALL_TAGS: {
        // const newState = {}
        const newState = {...action.tags}
        // action.image.likes.forEach((like) => {
        //     newState[like.id] = like
        // })
        return newState
      }
      case IMAGE_TAGS: {
        // const newState = {}
        const newState = {...action.imageId}
        // action.image.likes.forEach((like) => {
        //     newState[like.id] = like
        // })
        return newState
      }
      case CREATE_TAGS: {
        const newState = { ...state }
        newState[action.tag.id] = action.tag
        return newState
      }
      case UPDATE_TAGS: {
        const newState = { ...state }
        newState[action.tag.id] = action.tag
        return newState
      }
      case DELETE_TAGS: {
        const newState = { ...state }
        // delete newState[action.id]
        delete newState[action.id]
        return newState
      }
      default:
        return state;
    }
  }
