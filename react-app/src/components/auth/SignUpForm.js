import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import klickrLogo from '../../icons/Klickr-logo.png'
import "./SignUpForm.css"

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [previewImageUrl, setPreviewImageUrl] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (previewImageUrl == null || !previewImageUrl.endsWith('.jpg') || !previewImageUrl.endsWith('.png') || !previewImageUrl.endsWith('.jpeg')) {
      setPreviewImageUrl('https://creazilla-store.fra1.digitaloceanspaces.com/emojis/55737/grinning-face-with-big-eyes-emoji-clipart-xl.png')
    }
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, first_name, last_name, previewImageUrl, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };
  const updatePreviewImageUrl = (e) => {
    setPreviewImageUrl(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className='login-container'>
        <div className='inner-login'>
          <form className='login-form' onSubmit={onSignUp}>
            <div id="circles-container">
              <img src={klickrLogo} alt='' id='circles'></img>
            </div>
            <h4 id='to-klickr'>
              Sign up for Klickr
            </h4>
            <div className='label-input'>
              <label id="labelInputSignUpName">User Name</label>
              <input
                type='text'
                name='username'
                onChange={updateUsername}
                value={username}
              ></input>
            </div>
            <div className='label-input'>
              <label id='labelInputSignUpName'>First Name</label>
              <input
                type='text'
                name='first_name'
                onChange={updateFirstName}
                value={first_name}
              ></input>
            </div >
            <div className='label-input'>
              <label id='labelInputSignUpName'>Last Name</label>
              <input
                type='text'
                name='last_name'
                onChange={updateLastName}
                value={last_name}
              ></input>
            </div >
            <div className='label-input'>
              <label>Email address</label>
              <input
                type='text'
                name='email'
                onChange={updateEmail}
                value={email}
              ></input>
            </div >
            <div className='label-input'>
              <label>Profile Picture</label>
              <input
                type='text'
                name='previewImageUrl'
                onChange={updatePreviewImageUrl}
                value={previewImageUrl}
                required={false}
              ></input>
            </div >
            <div className='label-input'>
              <label id='password'>Password</label>
              <input
                type='password'
                name='password'
                onChange={updatePassword}
                value={password}
              ></input>
            </div>
            <div className='label-input'>
              <label id='repeat'>Repeat Password</label>
              <input
                type='password'
                name='repeat_password'
                onChange={updateRepeatPassword}
                value={repeatPassword}
                required={true}
              ></input>
            </div>
            <div className='button'>
              <button type='submit'>Sign Up</button>
            </div>
          </form>
        </div>
      </div>

    </>

  );
};

export default SignUpForm;
