import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { getImagesThunk } from "../../store/image";
import { getAllUsersThunk } from "../../store/AllUsers";

import "./SearchBar.css";
import CouragePng from "../../icons/IMG_8935.PNG";
import { useDispatch, useSelector } from "react-redux";

//if signed in
const SearchBar = () => {
  //state to keep track of search bar
  const [searchTitle, setSearchTitle] = useState("");

  const dispatch = useDispatch();

  let allImagesArray;
  let allUsersArray;

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
      <div className="upper-middle">
        <input
          className="notsignedin-SB"
          type="search"
          value={searchTitle}
          placeholder={"Search for Images or Users..."  || searchTitle}
          onChange={handleSubmit}
        />
      </div>
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
            {/* <div > */}
            {filteredImagesArray &&
              filteredImagesArray.map((image) => {
                return (
                  <div className="SearchImageMappedContainer" key={image.id}>
                    <img
                      className="SearchImageIndividual"
                      src={image.previewImageUrl}
                      alt="preview"
                      // onClick={() => redirect to image page))}
                    />
                    <NavLink
                      className="SearchImageNavLinkTitle"
                      to={`/images/${image.id}`}
                    >
                      {image.title}
                    </NavLink>
                  </div>
                );
              })}
            {/* </div> */}
          </div>
        </div>
        <div
          className={
            !filteredImagesArray.length && searchTitle !== ""
              ? "errorHandlingSearchContainer"
              : "HiddenResult"
          }
        >
          <div className="errorhandlingSearchmessage">
          No Images Found
          </div>
        </div>

        <div
          className={
            filteredUsersArray.length && searchTitle.length
              ? "Filtereduser-container"
              : "HiddenResult"
          }
        >
          {/* search return map */}
          <div className="FilteredreturnContainer">
            {filteredUsersArray &&
              filteredUsersArray.map((user) => {
                return (
                  <div className="SearchUserMappedContainer" key={user.id}>
                    <img
                      className="SearchImageIndividual"
                      src={CouragePng}
                      alt="profile pic"
                      // onClick={() => redirect to image page))}
                    />
                    <NavLink
                      className="SearchImageNavLinkTitle"
                      to={`/users/${user.id}`}
                    >
                      {user.username}
                    </NavLink>
                  </div>
                );
              })}
          </div>
        </div>
        <div
          className={
            !filteredUsersArray.length && searchTitle !== ""
              ? "errorHandlingSearchContainer"
              : "HiddenResult"
          }
        >
         <div className="errorhandlingSearchmessage">
          No Users Found
          </div>
          </div>
      </div>
    </>
  );
  } if(!user) {
    return (
      <>
        <div className="upper-middle">
          <input
            className="search-barNav"
            type="search"
            value={searchTitle}
            placeholder={"Search for Images or Users..." || searchTitle}
            onChange={handleSubmit}
          />
        </div>
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
              {/* <div > */}
              {filteredImagesArray &&
                filteredImagesArray.map((image) => {
                  return (
                    <div className="SearchImageMappedContainer" key={image.id}>
                      <img
                        className="SearchImageIndividual"
                        src={image.previewImageUrl}
                        alt="preview"
                        // onClick={() => redirect to image page))}
                      />
                      <NavLink
                        className="SearchImageNavLinkTitle"
                        to={`/images/${image.id}`}
                      >
                        {image.title}
                      </NavLink>
                    </div>
                  );
                })}
              {/* </div> */}
            </div>
          </div>
          <div
            className={
              !filteredImagesArray.length && searchTitle !== ""
                ? "errorHandlingSearchContainer"
                : "HiddenResult"
            }
          >
            <div className="errorhandlingSearchmessage">
            No Images Found
            </div>
          </div>

          <div
            className={
              filteredUsersArray.length && searchTitle.length
                ? "Filtereduser-container"
                : "HiddenResult"
            }
          >
            {/* search return map */}
            <div className="FilteredreturnContainer">
              {filteredUsersArray &&
                filteredUsersArray.map((user) => {
                  return (
                    <div className="SearchUserMappedContainer" key={user.id}>
                      <img
                        className="SearchImageIndividual"
                        src={CouragePng}
                        alt="profile"
                        // onClick={() => redirect to image page))}
                      />
                      <NavLink
                        className="SearchImageNavLinkTitle"
                        to={`/users/${user.id}`}
                      >
                        {user.username}
                      </NavLink>
                    </div>
                  );
                })}
            </div>
          </div>
          <div
            className={
              !filteredUsersArray.length && searchTitle !== ""
                ? "errorHandlingSearchContainer"
                : "HiddenResult"
            }
          >
           <div className="errorhandlingSearchmessage">
            No Users Found
            </div>
            </div>
        </div>
      </>
    );

  }

};

export default SearchBar;
