import "./HomePage.css";
import githubIcon from "../../icons/githubIcon.png";
import React from "react";
import { Link } from "react-router-dom";
import { CarouselSplashPage } from "./Carousel";
import { useSelector } from "react-redux";
export function HomePage() {
  const user = useSelector((state) => state.session.user);

  if (!user) {
  return (
    <>
      <div className="background">
        <CarouselSplashPage />
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
      Copyright 2022. Klickr. All Rights Reserved.
    </div>
  </footer>
    </>
  );
      }
  else {
  return (
    <>
      <div className="background">
        <CarouselSplashPage />
        <div className="center">
          <div className="main">
            <h1 className="inspiration">Welcome Back {user.first_name}</h1>

            <h2 className="first-line">
              The Klickr community is home to tens of billions of photos and
              2 million groups.
            </h2>

            <div id="for-free">
              <Link class="for-free-button" to="/explore"><h3>Explore</h3></Link>
            </div>

          </div>
        </div>
  <footer className="parentFooter">
    <div class="footer-home">
    Copyright 2022. Klickr. All Rights Reserved.  &nbsp; &nbsp; &nbsp; 
    <img className="ourRepo" src={githubIcon} alt="ourRepo"/> 
    <div className="footer-home-wrap-containers">
      <a className="text-for-github" href="https://github.com/ChzFlvrHrse/Klickr-Group"> https://github.com/ChzFlvrHrse/Klickr-Group</a>
    </div>
      </div>
  </footer>
      </div>
    </>
  );
      }
}
