import React from "react";
import {useEffect } from "react";
import { NavLink } from "react-router-dom";

import { getImagesThunk } from "../../store/image";
import { getAllUsersThunk } from "../../store/AllUsers";

import "./NavBar.css";
import klickrImage from "../../icons/klickr-logo-title.png";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import ProfileButton from "./ProfileButton.js";
import uploadImage from '../../icons/upload-icon.png'

//if signed in
let NavBar;

NavBar = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getImagesThunk());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllUsersThunk());
  }, [dispatch]);

  const user = useSelector((state) => state.session.user);

  if (user) {
    return (
      <nav className="nav-explore">
        <div className="NavBarLeftSide">
          <NavLink to="/">
            <img className="logo" src={klickrImage} alt="logo"/>
          </NavLink>
          <NavLink className="ExploreButtonNav" to={`/users/${user.id}`}>
            You
          </NavLink>
          <NavLink className="ExploreButtonNav" to="/explore">
            Explore
          </NavLink>
        </div>
        <div className="loggedInNav">
          {/* search bar functionality */}
          <SearchBar />
          {/* search bar functionality */}
        </div>
        <div className="navbar-explore-container">
          <div className="explore-bttn-container">
            <NavLink  to="/upload">
              <img className="upload-icon" src={uploadImage} alt="upload icon"></img>
            </NavLink>
            <ProfileButton user={user} />
          </div>
        </div>
      </nav>
    );
  } if (!user) {
  return (
    <>
      <nav className="nav-explore">
      <div className="NavBarLeftSide">
          <NavLink to="/">
            <img className="logo" src={klickrImage} alt="logo"/>
          </NavLink>
        </div>
        <div className="loggedOutSearchNav">
          {/* search bar functionality */}
          <SearchBar/>
          {/* search bar functionality */}
          </div>

        <div className="NavBarRightSide">
          <NavLink className="log-in" to="/login">
            Log In
          </NavLink>
          <NavLink className="sign-up" to="/signup">
            Sign Up
          </NavLink>

        </div>
      </nav>
    </>
  );
};
}
export default NavBar;
