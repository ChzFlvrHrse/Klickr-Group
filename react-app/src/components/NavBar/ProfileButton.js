import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import * as sessionActions from "../../store/session";
import defaultpic from "../../icons/defaultpic.png";
import LogoutButton from "../auth/LogoutButton";
import circle from "../../icons/circle.png";
import "./ProfileButton.css";

export default function ProfileButton({ users }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [showMenu, setShowMenu] = useState(false);
  const allImages = useSelector(state => state.image);
  const allImagesArr = Object.values(allImages);

  const { userId } = useParams();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push("/");
  };

  const userImagesArr = allImagesArr.filter((image) => image.userId == sessionUser.id)

  // const userImagesArr = allImagesArr.filter((image) => image.userId == userId)
 



  return (
    <div>
      <div className="profile-button-border" onClick={openMenu}>
        <img
          className="profile-icon"
          src={sessionUser.previewImageUrl}
          alt=""
        />
      </div>
      {showMenu && (
        <div className="profile-dropdown">
          {sessionUser && (
            <div className="profile-list">
              <div className="user-name-li">
                Bonjour&nbsp;
                <NavLink
                  className="profile-page-reroute"
                  to={`/users/${sessionUser.id}`}
                >
                  {sessionUser.username}! {" "}
                </NavLink>

              </div>
              <div upload-photo-dropdown>
                <div className="three-item-container">
                <div className="numOfImages">
              {userImagesArr.length} of 1,000 items
              </div>
                <NavLink className="profile-page-reroute-upload"              
                to={"/upload"}> <img className="circle-nav" src={circle}></img> Upload your Photos  </NavLink>
                </div>
                </div>
              <div className="hover-link logout-li" onClick={logout}>
                Log Out
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
