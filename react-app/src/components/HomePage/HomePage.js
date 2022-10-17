import "./HomePage.css";
import { useState, useEffect } from "react";
import React from "react";
import { NavLink, Link } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import klickrLogoTitle from "../../icons/klickr-logo-title.png"

export function HomePage() {

  return (
    <>
      <div className="background">
        {/* <nav className="nav">
          <div className="upper-right">
            <NavLink to='/'>
              <img className="logo" src={klickrLogoTitle} alt=''></img>
            </NavLink>
          </div>
          <div className="upper-middle">
            <input className='search-bar' placeholder="Photos, people, or groups" />
          </div>
          <div className="upper-right">
            <NavLink className="log-in" to='/login'>Log In</NavLink>
            <NavLink className="sign-up" to='/signup'>Sign Up</NavLink>
          </div>
        </nav> */}
        <div className="center">
          <div className="main">
            <h1 className="inspiration">Find your inspiration.</h1>

            <h2 className="first-line">
              Join the Flickr community, home to tens of billions of photos and
              2 million groups.
            </h2>

            <div id="for-free">
              <Link class="for-free-button" to="/signup"><h3>Start for free</h3></Link>
            </div>

          </div>
        </div>
      </div>
      <footer>
    <div class="footer">
      Copyright 2022. Klickr. All Rights Reserved or Something.
    </div>
  </footer>
    </>
  );
}
