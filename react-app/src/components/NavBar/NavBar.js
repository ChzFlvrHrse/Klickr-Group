import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import { Dispatch } from "react";

import { getImagesThunk } from "../../store/image";
import { getAllUsersThunk } from "../../store/AllUsers";

import "./NavBar.css";
import klickrImage from "../../icons/klickr-logo-title.png";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from './SearchBar'

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
  const images = useSelector((state) => state.image);
  const allusers = useSelector((state) => state.allUsers);

  if (user) {
    return (
      <>
        <NavLink className="upload-icon" to="/upload">
          <i class="fa-solid fa-cloud-arrow-up"></i>
        </NavLink>
        <NavLink to="/" className="logout-button">
          <LogoutButton />
        </NavLink>
      </>
    );
  }
  return (
    <>
      <nav className="nav-explore">
        <div>
          <NavLink to="/explore">
            <img className="logo" src={klickrImage} />
          </NavLink>
        </div>
        <div className="upper-middle">
          {/* search bar functionality */}
          <SearchBar />
          {/* search bar functionality */}
        </div>
        <div className="NavBarRightSide">
          <NavLink className="log-in" to="/login">
            Log In
          </NavLink>
          <NavLink className="sign-up" to="/signup">
            Sign Up
          </NavLink>
          <NavLink className="upload-icon" to="/upload">
            <i class="fa-solid fa-cloud-arrow-up"></i>
          </NavLink>
          <NavLink to="/" className="logout-button">
            <LogoutButton />
          </NavLink>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
