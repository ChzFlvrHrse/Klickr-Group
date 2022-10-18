import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import defaultpic from "../../icons/defaultpic.png";
import LogoutButton from "../auth/LogoutButton";
import "./ProfileButton.css";

export default function ProfileButton({ users }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [showMenu, setShowMenu] = useState(false);

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
                  {sessionUser.first_name} {sessionUser.last_name}{" "}
                </NavLink>
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
