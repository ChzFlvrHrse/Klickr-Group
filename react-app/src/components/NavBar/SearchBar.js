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

//if signed in
let NavBar;

NavBar = () => {
  //state to keep track of search bar
  const [searchTitle, setSearchTitle] = useState("");

  const dispatch = useDispatch();

  let allImagesArray;
  let allUsersArray;
  let allSearchArray;

  let filteredImagesArray;
  let filteredUsersArray;

  useEffect(() => {
    dispatch(getImagesThunk());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllUsersThunk());
  }, [dispatch]);

  const user = useSelector((state) => state.session.user);
  const images = useSelector((state) => state.image);
  const allusers = useSelector((state) => state.allUsers);

  allImagesArray = Object.values(images);
  allUsersArray = Object.values(allusers);

  if (allImagesArray.length > 0) {
    filteredImagesArray = allImagesArray.filter((filteredValues, index) =>
      filteredValues.title.toLowerCase().includes(searchTitle.toLowerCase())
    );
  } else filteredImagesArray = "";

  if (allUsersArray.length > 0) {
    filteredUsersArray = allUsersArray.filter((filteredValues, index) =>
      filteredValues.username.toLowerCase().includes(searchTitle.toLowerCase())
    );
  } else filteredUsersArray = "";

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchTitle(e.target.value);
  };

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
          <input
            className="search-barNav"
            type="search"
            value={searchTitle}
            placeholder={"Search for Images or Users..." || searchTitle}
            onChange={handleSubmit}
          />
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
      {/* search bar return container */}
      <div
        className={searchTitle.length ? "SearchBarContainer" : "HiddenResult"}
      >
        <div
          className={
            filteredImagesArray.length && searchTitle.length
              ? "Filteredimages-container"
              : "HiddenResult"
          }
        >
          {/* search return map */}
          <div className="FilteredreturnContainer">
            <div>
              {filteredImagesArray &&
                filteredImagesArray.map((image) => {
                  return (
                    <div className="TrendingsongCard" key={image.id}>
                      <div className="PlayButtonContainer">
                        <img
                          className="PlayMe"
                          src={image.previewImageUrl}
                          // onClick={() => redirect to image page))}
                        />
                      </div>
                      <NavLink
                        className="TrendingsongLink"
                        to={`/images/${image.id}`}
                      >
                        {image.title}
                      </NavLink>
                    </div>
                  );
                })}
            </div>
            <div
              className={
                !filteredImagesArray.length && searchTitle != ""
                  ? "errorHandlingSongSearch"
                  : "HiddenResult"
              }
            >
              No Images Found
            </div>
          </div>
        </div>

        <div
          className={
            filteredImagesArray.length && searchTitle.length
              ? "Filteredimages-container"
              : "HiddenResult"
          }
        />
        {/* search return map */}
        <div className="FilteredreturnContainer">
          <div>
            {filteredUsersArray &&
              filteredUsersArray.map((user) => {
                return (
                  <div className="TrendingsongCard" key={user.id}>
                    <NavLink
                      className="TrendingsongLink"
                      to={`/users/${user.id}`}
                    >
                      {user.username}
                    </NavLink>
                  </div>
                );
              })}
          </div>
          <div
            className={
              !filteredUsersArray.length && searchTitle != ""
                ? "errorHandlingSongSearch"
                : "HiddenResult"
            }
          >
            No Users Found
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
