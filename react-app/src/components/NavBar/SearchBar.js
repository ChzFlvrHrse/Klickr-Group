import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { getAlbumsThunk } from "../../store/album";
import { login } from "../../store/session";

import { getImagesThunk } from "../../store/image";
import { getAllUsersThunk } from "../../store/AllUsers";

import { getAllTagsThunk } from "../../store/tags";
import "./SearchBar.css";
import { useDispatch, useSelector } from "react-redux";

//if signed in
const SearchBar = () => {
  //state to keep track of search bar
  const [searchTitle, setSearchTitle] = useState("");

  // create states to hide and unhide search results container
  const [imageResults, setImageResults] = useState(true);

  const [albumResults, setAlbumResults] = useState(true);
  const [tagResults, setTagResults] = useState(false);
  const [userResults, setUserResults] = useState(false);

  // tag state
  const dispatch = useDispatch();

  let allImagesArray;
  let allAlbumsArray;
  let allUsersArray;
  let allTagsArray;

  let filteredImagesArray;
  let filteredAlbumsArray;
  let filteredUsersArray;
  let filteredTagsArray;

  useEffect(() => {
    dispatch(getImagesThunk());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAlbumsThunk());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAllTagsThunk());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAllUsersThunk());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllTagsThunk());
  }, [dispatch]);

  const user = useSelector((state) => state.session.user);
  const images = useSelector((state) => state.image);
  const allusers = useSelector((state) => state.allUsers);
  const albums = useSelector((state) => state.album);

  const allTags = useSelector((state) => state.tags);

  allImagesArray = Object.values(images);
  allUsersArray = Object.values(allusers);
  allAlbumsArray = Object.values(albums);
  allTagsArray = Object.values(allTags);

  if (allImagesArray.length > 0) {
    filteredImagesArray = allImagesArray.filter((filteredValues, index) =>
      filteredValues.title.toLowerCase().includes(searchTitle.toLowerCase())
    );
  } else filteredImagesArray = "";

  if (allAlbumsArray.length > 0) {
    filteredAlbumsArray = allAlbumsArray.filter((filteredValues, index) =>
      filteredValues.title.toLowerCase().includes(searchTitle.toLowerCase())
    );
  } else filteredAlbumsArray = "";

  if (allTagsArray.length > 0) {
    filteredTagsArray = allTagsArray.filter((filteredValues, index) =>
      filteredValues.body.toLowerCase().includes(searchTitle.toLowerCase())
    );
  } else filteredTagsArray = "";

  if (allUsersArray.length > 0 && allUsersArray.username != null) {
    filteredUsersArray = allUsersArray.filter((filteredValues, index) =>
      filteredValues.username.toLowerCase().includes(searchTitle.toLowerCase())
    );
  } else filteredUsersArray = "";


  if (allTagsArray.length > 0) {
    filteredTagsArray = allTagsArray.filter((filteredValues, index) =>
      filteredValues.body.toLowerCase().includes(searchTitle.toLowerCase())
    );
  } else filteredTagsArray = "";


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
            placeholder={
              "Search for Images, Users, Albums, or Tags" || searchTitle
            }
            onChange={handleSubmit}
          />
        </div>
        {/* search bar return container entire*/}
        <div
          className={searchTitle.length ? "SearchBarContainer" : "HiddenResult"}
        >
          {/* search by images begins */}
          <button
            className="toggleResultsSearch"
            onClick={() => {
              setImageResults(!imageResults);
            }}
          >
            {imageResults == true ? (
              <div>Hide Image Results</div>
            ) : (
              <div>Show Image Results</div>
            )}
          </button>
          <div
            className={
              filteredImagesArray.length &&
              searchTitle.length &&
              imageResults == true
                ? "Filteredimages-container"
                : "HiddenResult"
            }
          >
            {/* search return map */}
            <div className="FilteredreturnContainer">
              {filteredImagesArray &&
                filteredImagesArray.map((image) => {
                  return (
                    <div
                      className="SearchImageMappedContainer"
                      key={image.id}
                      onClick={() => setSearchTitle("")}
                    >
                      <Link to={`/images/${image.id}`}>
                        <img
                          className="SearchImageIndividual"
                          src={image.previewImageUrl}
                          alt="preview"
                        />
                      </Link>
                      <NavLink
                        className="SearchImageNavLinkTitle"
                        to={`/images/${image.id}`}
                      >
                        {image.title}
                      </NavLink>
                    </div>
                  );
                })}
            </div>
          </div>
          <div
            className={
              !filteredImagesArray.length &&
              searchTitle !== "" &&
              imageResults == true
                ? "errorHandlingSearchContainer"
                : "HiddenResult"
            }
          >
            <div className="errorhandlingSearchmessage">No Images Found</div>
          </div>

          {/* search by Albums begins */}
          <button
            className="toggleResultsSearch"
            onClick={() => {
              setAlbumResults(!albumResults);
            }}
          >
            {albumResults == true ? (
              <div>Hide Album Results</div>
            ) : (
              <div>Show Album Results</div>
            )}
          </button>
          <div
            className={
              filteredAlbumsArray.length &&
              searchTitle.length &&
              albumResults == true
                ? "Filteredimages-container"
                : "HiddenResult"
            }
          >
            {/* search return map */}
            <div className="FilteredreturnContainer">
              {filteredAlbumsArray &&
                filteredAlbumsArray.map((album) => {
                  return (
                    <div
                      className="SearchImageMappedContainer"
                      key={album.id}
                      onClick={() => setSearchTitle("")}
                    >
                      <Link to={`/albums/${album.id}`}>
                        <img
                          className="SearchImageIndividual"
                          src={album.previewImageUrl}
                          alt="preview"
                        />
                      </Link>
                      <NavLink
                        className="SearchImageNavLinkTitle"
                        to={`/albums/${album.id}`}
                      >
                        {album.title}
                      </NavLink>
                    </div>
                  );
                })}
            </div>
          </div>
          <div
            className={
              !filteredAlbumsArray.length &&
              searchTitle !== "" &&
              albumResults == true
                ? "errorHandlingSearchContainer"
                : "HiddenResult"
            }
          >
            <div className="errorhandlingSearchmessage">No Albums Found</div>
          </div>

          {/* search by user begins */}
          <button
            className="toggleResultsSearch"
            onClick={() => {
              setUserResults(!userResults);
            }}
          >
            {userResults == true ? (
              <div>Hide User Results</div>
            ) : (
              <div>Show User Results</div>
            )}
          </button>
          <div
            className={
              filteredUsersArray.length &&
              searchTitle.length &&
              userResults == true
                ? "Filteredimages-container"
                : "HiddenResult"
            }
          >
            {/* search return map */}
            <div className="FilteredreturnContainer">
              {filteredUsersArray &&
                filteredUsersArray.map((user) => {
                  return (
                    <div
                      className="SearchImageMappedContainer"
                      key={user.id}
                      onClick={() => setSearchTitle("")}
                    >
                      <Link to={`/users/${user.id}`}>
                        <img
                          className="SearchImageIndividual"
                          src={user.previewImageUrl}
                          alt="preview"
                        />
                      </Link>
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
              !filteredUsersArray.length &&
              searchTitle !== "" &&
              userResults == true
                ? "errorHandlingSearchContainer"
                : "HiddenResult"
            }
          >
            <div className="errorhandlingSearchmessage">No Users Found</div>
          </div>
         {/* search by tags begins */}
          <button
            className="toggleResultsSearch"
            onClick={() => {
              setTagResults(!tagResults);
            }}
          >
            {tagResults == true ? (
              <div>Hide Tag Results</div>
            ) : (
              <div>Show Tag Results</div>
            )}
          </button>
          <div
            className={
              filteredTagsArray.length &&
              searchTitle.length &&
              tagResults == true
                ? "Filteredimages-container"
                : "HiddenResult"
            }
          >
            {/* search return map */}
            <div className="FilteredreturnContainer">
              {filteredTagsArray &&
                filteredTagsArray.map((tag) => {
                  return (
                    <div key={tag.id}>
                      {" "}
                      {allImagesArray &&
                        allImagesArray.map((image) => {
                          return (
                            <>
                              {image.id == tag.imageId ? (
                                <div
                                  className="SearchImageMappedContainer"
                                  key={image.id == tag.imageId ? image.id : ""}
                                  onClick={() => setSearchTitle("")}
                                >
                                  <Link
                                    to={
                                      image.id == tag.imageId
                                        ? `/images/${image.id}`
                                        : ""
                                    }
                                  >
                                    <img
                                      className="SearchImageIndividual"
                                      // src={image.previewImageUrl}
                                      src={
                                        image.id == tag.imageId
                                          ? image.previewImageUrl
                                          : ""
                                      }
                                      alt="preview"
                                    />
                                  </Link>
                                  <NavLink
                                    className="SearchImageNavLinkTitle"
                                    to={
                                      image.id == tag.imageId
                                        ? `/images/${image.id}`
                                        : ""
                                    }
                                  >
                                    {tag.body}
                                  </NavLink>
                                </div>
                              ) : (
                                ""
                              )}
                            </>
                          );
                        })}
                    </div>
                  );
                })}
            </div>
          </div>
          <div
            className={
              !filteredTagsArray.length &&
              searchTitle !== "" &&
              tagResults == true
                ? "errorHandlingSearchContainer"
                : "HiddenResult"
            }
          >
            <div className="errorhandlingSearchmessage">No Tags Found</div>
          </div>
        </div>
      </>
    );
  }

  if (!user) {
    const onLogin = async (e) => {
      e.preventDefault();
      await dispatch(login("demo@aa.io", "password"));
    };
    if (!user) {
      return (
        <>
          <div className="upper-middle">
            <input
              className="search-barNav"
              type="search"
              value={searchTitle}
              placeholder={"Please login as a user first..." || searchTitle}
              onChange={handleSubmit}
            />
          </div>
          {/* search bar return container */}
          <div
            className={
              searchTitle.length ? "SearchBarContainer" : "HiddenResult"
            }
          >
            {/* search return map */}
            <div className="FilteredreturnContainerDemo">
              <div className="button">
                <button className="loginform-bttns" onClick={onLogin}>
                  Click here to login as Demo User
                </button>
              </div>
            </div>
          </div>
        </>
      );
    }
  }
};
export default SearchBar;
