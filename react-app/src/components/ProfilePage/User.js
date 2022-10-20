import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import { getImagesThunk } from '../../store/image'
import { getAllLikesThunk } from '../../store/likes';

import { NavLink, useParams } from 'react-router-dom';
import coverPhoto from '../../icons/profile-cover-photo.jpeg'
import './User.css'


function User() {

  let createdAtDate;
  const [user, setUser] = useState({});
  const { userId } = useParams();


  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getImagesThunk())
  }, [dispatch])

  const allImages = useSelector(state => state.image);
  const allImagesArr = Object.values(allImages);

  const userImagesArr = allImagesArr.filter((image) => image.userId == userId)


  useEffect(() => {
    dispatch(getAllLikesThunk())
  }, [dispatch])

  const allLikes = useSelector(state => state.likes);
  const allLikesArr = Object.values(allLikes);

  const userImagesIds = userImagesArr.map((image) => image.id)
  const likedImagesIds = allLikesArr.map((like) => like.imageId)

  // console.log('User image Ids----', userImagesIds)
  // console.log('Liked Images Ids----', likedImagesIds)

  const userLikedImages = []

  likedImagesIds.forEach((like) => {
    if (userImagesIds.includes(like)) {
      userLikedImages.push(like)
    }
  })

  // console.log('User liked images', userTotalLikes)

  const totalUserFaves = userLikedImages.length


  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (user.id == userId) {
    // get a string of the createdat date only
    const createdAtObject = user.created_at
    const createdAtString = JSON.stringify(createdAtObject)
    const date = createdAtString.slice(5, 8)
    const month = createdAtString.slice(9, 12)
    const year = createdAtString.slice(13, 17)
    createdAtDate = `${month} ${date}, ${year}`
  }

  if (!user) {
    return null;
  }


  return (
    <div className='profile-container'>
      <div className='cover-photo-container'>
        <img className='cover-photo' src={coverPhoto} alt=''></img>
      </div>
      <div className='user-title-container'>
        <div className='profile-pic-name'>
          <div>
            <img className='user-profile-pic' src={user.previewImageUrl} alt="profile preview"></img>
          </div>
          <div className='user-fName-lName-username'>
            <div style={{ fontSize: '36px', color: 'white', fontWeight: '330' }}>{user.first_name} {user.last_name}</div>
            <div className='username-joined'>
              <div style={{ fontSize: '20px', color: 'white', fontWeight: '330' }}>{user.username}</div>
              <div className='joined' style={{ fontSize: '18px', color: 'white', fontWeight: '330' }}>Joined {createdAtDate}</div>
            </div>
          </div>
        </div>
      </div>
      <div className='user-showcase-container'>
        <div className='user-showcase-wrapper'>
          <h4 className='showcase-title'>Showcase</h4>
          <div className='user-photos-container'>
            {userImagesArr.map((image) =>
              <div className='user-singleImgContainer'>
                <NavLink to={`/images/${image.id}`}>
                  <img className='user-single-img' src={image.previewImageUrl}></img>
                </NavLink>
                <div className='explore-image-bttm-section'>
                    <div className="hide" style={{color: 'white'}}>{image.title}</div>
                </div>
              </div>
            )}
          </div>
          <div className='user-photo-details-container'>
            <div className='user-photo-details'>
              <div className='user-photo-details-info'>
                <div style={{ fontSize: '22px' }}>{userImagesArr.length}</div>
                <div style={{ color: 'grey' }}>images</div>
              </div>
              <div className='user-photo-details-info'>
                <div style={{ fontSize: '22px' }}>{totalUserFaves}</div>
                <div style={{ color: 'grey' }}>faves</div>
              </div>
            </div>
          </div>
          <div className='user-info-container'>
            <div className='user-info'>Joined<div className='user-joined'>{createdAtDate}</div></div>
            <div className='user-info'>Email<div className='user-email'>{user.email}</div></div>
          </div>
        </div>
      </div>
    </div>


  );
}
export default User;
