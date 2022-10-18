import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import profilePic from '../../icons/defaultpic.png'
import coverPhoto from '../../icons/profile-cover-photo.jpeg'
import './User.css'

function User() {
let createdAtDate;
  const [user, setUser] = useState({});
  const { userId } = useParams();



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

if (user.id == userId){
  // get a string of the createdat date only
  const createdAtObject = user.created_at
  const createdAtString = JSON.stringify(createdAtObject)
 createdAtDate = createdAtString.slice(1, 17)
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
            <img className='user-profile-pic' src={user.previewImageUrl}  alt="profile preview"></img>
          </div>
          <div className='user-fName-lName-username'>
            <div style={{ fontSize: '36px', color: 'white', fontWeight: '330' }}>{user.first_name} {user.last_name}</div>
            <div className='username-joined'>
              <div style={{ fontSize: '20px', color: 'white', fontWeight: '330' }}>{user.username}</div>
              <div className='joined' style={{ fontSize: '20px', color: 'white', fontWeight: '330' }}>Joined {createdAtDate}</div>
            </div>
          </div>
        </div>
      </div>
      <div className='user-showcase-container'>
        <div className='user-showcase-wrapper'>
          <h4 className='showcase-title'>Showcase</h4>
          <div className='user-photos-container'>
            <div>USER PHOTOS HERE</div>
          </div>
          <div className='user-photo-details-container'>
            <div className='user-photo-details'>
              <div className='user-photo-details-info'>
                <div style={{ fontSize: '22px' }}>0</div>
                <div style={{ color: 'grey' }}>images</div>
              </div>
              <div className='user-photo-details-info'>
                <div style={{ fontSize: '22px' }}>0</div>
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
