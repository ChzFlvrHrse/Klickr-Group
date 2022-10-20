import React from "react";
import klickrLogo from "../../icons/Klickr-logo.png";
import "./PageNotFound.css";
import { NavLink } from "react-router-dom";

export function PageNotFound() {
  return (
    <div className="login-containerPNF">
      <div className="inner-loginPNF">
        <div id="login-bannerPNF">
          <div id="circles-containerPNF">
            <img src={klickrLogo} alt="" id="circlesPNF"></img>
          </div>
          <h4 id="to-klickr1">Page Not Found</h4>
          <div className="linkerror">
            <NavLink to="/" className='linkerrorText'>Click here to go home</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
