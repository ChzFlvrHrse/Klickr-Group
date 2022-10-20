import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { getAlbumsThunk } from "../../store/album";
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
  const [imageResults, setImageResults] = useState(true)
  const [albumResults, setAlbumResults] = useState(true)
  const [userResults, setUserResults] = useState(false)
  const [tagResults, setTagResults] = useState(false)

  const dispatch = useDispatch();

  let allImagesArray;
  let allAlbumsArray;
  let allTagsArray;
  let allUsersArray;

  let filteredImagesArray;
  let filteredAlbumsArray;
  let filteredTagsArray;
  let filteredUsersArray;

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
            placeholder={"Search for Images, Users, Albums, or Tags" || searchTitle}
            onChange={handleSubmit}
          />
        </div>
        {/* search bar return container entire*/}
        <div
          className={searchTitle.length ? "SearchBarContainer" : "HiddenResult"}
         >
          {/* search by images begins */}
          <button className="toggleResultsSearch" onClick={() => {setImageResults(!imageResults)}}>{imageResults == true ? <div>Hide Image Results</div> : <div>Show Image Results</div>}</button>
          <div
            className={
              filteredImagesArray.length && searchTitle.length && imageResults == true
                ? "Filteredimages-container"
                : "HiddenResult"
            }
            >
            {/* search return map */}
            <div className="FilteredreturnContainer">
              {filteredImagesArray &&
                filteredImagesArray.map((image) => {
                  return (
                    <div className="SearchImageMappedContainer" key={image.id}>
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
              !filteredImagesArray.length && searchTitle !== ""
                ? "errorHandlingSearchContainer"
                : "HiddenResult"
            }
          >
            <div className="errorhandlingSearchmessage">No Images Found</div>
          </div>

            {/* search by Albums begins */}
          <button className="toggleResultsSearch" onClick={() => {setAlbumResults(!albumResults)}}>{albumResults == true ? <div>Hide Album Results</div> : <div>Show Album Results</div>}</button>
          <div
            className={
              filteredAlbumsArray.length && searchTitle.length && albumResults == true
                ? "Filteredimages-container"
                : "HiddenResult"
            }
            >
            {/* search return map */}
            <div className="FilteredreturnContainer">
              {filteredAlbumsArray &&
                filteredAlbumsArray.map((album) => {
                  return (
                    <div className="SearchImageMappedContainer" key={album.id}>
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
              !filteredAlbumsArray.length && searchTitle !== ""
                ? "errorHandlingSearchContainer"
                : "HiddenResult"
            }
          >
            <div className="errorhandlingSearchmessage">No Albums Found</div>
          </div>

           {/* search by images begins */}
           <button className="toggleResultsSearch" onClick={() => {setUserResults(!userResults)}}>{userResults == true ? <div>Hide User Results</div> : <div>Show User Results</div>}</button>
          <div
            className={
              filteredUsersArray.length && searchTitle.length && userResults == true
                ? "Filteredimages-container"
                : "HiddenResult"
            }
            >
            {/* search return map */}
            <div className="FilteredreturnContainer">
              {filteredUsersArray &&
                filteredUsersArray.map((user) => {
                  return (
                    <div className="SearchImageMappedContainer" key={user.id}>
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
              !filteredUsersArray.length && searchTitle !== ""
                ? "errorHandlingSearchContainer"
                : "HiddenResult"
            }
          >
            <div className="errorhandlingSearchmessage">No Users Found</div>
          </div>
        </div>
      </>
    );
  }
  if (!user) {
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
                      <Link to={`/images/${image.id}`}>
                        <img
                          className="SearchImageIndividual"
                          src={image.previewImageUrl}
                          alt="preview"
                          // onClick={() => redirect to image page))}
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
            <div className="errorhandlingSearchmessage">No Images Found</div>
          </div>

          <div
            className={
              filteredUsersArray.length && searchTitle.length
                ? "Filtereduser-container"
                : "HiddenResult"
            }
          >
            {/* search return map */}
            <div className="FilteredUserReturnContainer">
              {filteredUsersArray &&
                filteredUsersArray.map((user) => {
                  return (
                    <div className="SearchUserMappedContainer" key={user.id}>
                      <NavLink to={`/users/${user.id}`}>
                        <img
                          className="SearchUserImageIndividual"
                          src={user.previewImageUrl}
                          alt="profile"
                        />
                      </NavLink>
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
            <div className="errorhandlingSearchmessage">No Users Found</div>
          </div>
        </div>
      </>
    );
  }
};

export default SearchBar;
