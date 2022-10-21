import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import klickrLogo from "../../icons/Klickr-logo.png";
import * as sessionActions from "../../store/session";
import "./SignUpForm.css";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [previewImageUrl, setPreviewImageUrl] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errorValidation, setErrorValidation] = useState([]);
  const user = useSelector((state) => state.session.user);

  const dispatch = useDispatch();

  useEffect(() => {
    let errors = [];

    if (username.length > 40 || username.length < 4) errors.push("Username must be between 4 and 40 characters");
    if (first_name.length > 25 || first_name.length < 2) errors.push("First name must be between 4 and 25 characters");
    if (last_name.length > 25 || last_name.length < 2) errors.push("Last name must be between 4 and 25 characters");
    if (!password.length) errors.push("Password is required");
    if (password !== repeatPassword) errors.push("Passwords must match");

    setErrorValidation(errors)

  }, [username, first_name, last_name, password])

  const onSignUp = async (e) => {
    e.preventDefault();

    if (!email.includes("@")) {
      return setErrors(["Please enter a valid email address"]);
    }

    if (password === repeatPassword) {
      const data = await dispatch(
        signUp(
          username,
          first_name,
          last_name,
          email,
          previewImageUrl,
          password
        )
      );
      if (data) {
        setErrors(data);
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
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className="signup-container">
        <div className="inner-signup">
          <form autoComplete="off" className="signup-form" onSubmit={onSignUp}>
            <div id="circles-container">
              <img src={klickrLogo} alt="" id="circles"></img>
            </div>
            <h4 id="to-klickr">Sign up for Klickr</h4>
            <div className="signup-form-errors">
              {errorValidation.length > 0 && (
                <div className="signup-errors-wrapper">
                  {errorValidation.map((error, idx) => (
                    <div key={idx}>{error}</div>
                  ))}
                </div>
              )}
            </div>
            <div className="label-input">
              <label id="labelInputSignUpName">User Name</label>
              <input
                type="text"
                name="username"
                onChange={updateUsername}
                value={username}
                required={true}
                autoComplete="username"
              ></input>
            </div>
            <div className="label-input">
              <label id="labelInputSignUpName">First Name</label>
              <input
                type="text"
                name="first_name"
                onChange={updateFirstName}
                value={first_name}
                autoComplete="first_name"
                required={true}
              ></input>
            </div>
            <div className="label-input">
              <label id="labelInputSignUpName">Last Name</label>
              <input
                type="text"
                name="last_name"
                autoComplete="last_name"
                onChange={updateLastName}
                value={last_name}
                required={true}
              ></input>
            </div>
            <div className="label-input">
              <label>Email address</label>
              <input
                type="text"
                name="email"
                autoComplete="email"
                onChange={updateEmail}
                value={email}
                required={true}
              ></input>
            </div>
            <div className="label-input">
              <label id="profile-pic">Profile Picture (Optional)</label>
              <input
                type="text"
                name="previewImageUrl"
                autoComplete="previewImageUrl"
                onChange={updatePreviewImageUrl}
                value={previewImageUrl}
              ></input>
            </div>
            <div className="label-input">
              <label id="password">Password</label>
              <input
                type="password"
                name="password"
                onChange={updatePassword}
                value={password}
                autoComplete="off"
                required={true}
              ></input>
            </div>
            <div className="label-input">
              <label id="repeat">Repeat Password</label>
              <input
                type="password"
                name="repeat_password"
                onChange={updateRepeatPassword}
                value={repeatPassword}
                autoComplete="off"
                required={true}
              ></input>
            </div>

            <div className="button">
              <button type="submit" disabled={errorValidation.length}>Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
