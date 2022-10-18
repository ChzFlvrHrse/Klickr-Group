import "./Carousel.css";
import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getImagesThunk } from "../../store/image";
import { getAllUsersThunk } from "../../store/AllUsers";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "react";

export function CarouselSplashPage() {
  const dispatch = useDispatch();
  const [backgroundImageNumber, setBackgroundImageNumber] = useState(0);
  let imageArray;
  let usersArray;
  let imageFiltered;

  useEffect(() => {
    dispatch(getImagesThunk());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllUsersThunk());
  }, [dispatch]);

  const imagesState = useSelector((state) => state.image);
  const allusers = useSelector((state) => state.allUsers);

  imageArray = Object.values(imagesState);

  const images = [
    {
      imageUrl:
        "https://combo.staticflickr.com/ap/build/images/sohp/2020-top-25/Fantasy_Island_Daniel_Cheong.jpg",
      title: "Fantasy Island",
      author: "Daniel Cheong",
    },
    {
      imageUrl:
        "https://combo.staticflickr.com/ap/build/images/sohp/2020-top-25/Secluded_Pete_Rowbottom.jpg",
      title: "Secluded",
      author: "Pete Rowbottom",
    },
    {
      imageUrl:
        "https://combo.staticflickr.com/ap/build/images/sohp/2020-top-25/Untitled_Jorge_Guadalupe_Lizarraga.jpg",
      title: "Albuquerque, New Mexico",
      author: "Jorge Guadalupe Lizarrága",
    },
    {
      imageUrl:
        "https://combo.staticflickr.com/ap/build/images/sohp/2020-top-25/Europes_best_View_Fabian_Fortmann.jpg",
      title: "Europe's Best View",
      author: "Fabian Fortmann",
    },
    {
      imageUrl:
        "https://combo.staticflickr.com/ap/build/images/sohp/2020-top-25/Mists_of_renfrew_Adam_Gibbs.jpg",
      title: "Mists of Renfrew",
      author: "Adam Gibbs",
    },
    {
      imageUrl:
        "https://combo.staticflickr.com/ap/build/images/sohp/2020-top-25/sunset_1663_Junji_Aoyama.jpg",
      title: "Sunset 1663",
      author: "Junji Aoyama",
    },
    {
      imageUrl:
        "https://combo.staticflickr.com/ap/build/images/sohp/2020-top-25/Tree_and_Morning_Mist_Jos_Buurmans.jpg",
      title: "Tree and Morning Mist",
      author: "Jos Buurmans",
    },
    {
      imageUrl:
        "https://combo.staticflickr.com/ap/build/images/sohp/2020-top-25/Desert_Beauty_Christoph_Fischer.jpg",
      title: "Desert Beauty",
      author: "Christoph Fischer",
    },
    {
      imageUrl:
        "https://combo.staticflickr.com/ap/build/images/sohp/2020-top-25/Catwalk_am_Bahnhof_Zurich_Oerlikon_Peter_Arn.jpg",
      title: "Catwalk am Bahnhof Zürich Oerlikon",
      author: "Peter Arn",
    },
    {
      imageUrl:
        "https://combo.staticflickr.com/ap/build/images/sohp/2020-top-25/Dawn_of_Another_Day_Sky_Matthews.jpg",
      title: "Dawn of Another Day",
      author: "Sky Matthews",
    },
  ];

  // useEffect to map through the length of the imagesArray infinitely while setting an image number
  useEffect(() => {
    const backgroundImageTransition = setInterval(() => {
      setBackgroundImageNumber(
        (previousBackgroundImageNumber) =>
          (previousBackgroundImageNumber + 1) % images.length
      );
      // }
    }, 4000);
    return () => clearInterval(backgroundImageTransition);
  }, []);

  if (imageArray.length) {
    imageFiltered = imageArray.filter(
      (image) => image.title == images[backgroundImageNumber].title
    );
  }

  console.log(imageFiltered);

  return (
    <>
      {images.map((image, index) => {
        return (
          <>
            <div
              className={
                index == backgroundImageNumber
                  ? "ActiveImageBackgroundCarousel"
                  : "InactiveImageBackgroundCarousel"
              }
              key={index}
            >
              <img
                className="imageCarouselArray"
                src={image.imageUrl}
                alt="CarouselImageBackground"
              />
            </div>
            {imageFiltered && (
              <div
                className={
                  index == backgroundImageNumber
                    ? "ActiveImageCaptionsCarousel"
                    : "InactiveImageCaptionsCarousel"
                }
              >
                <div className="BackgroundImageCarouselTitle">
                  <NavLink to={`/images/${imageFiltered[0].id}`}>
                    {image.title}
                  </NavLink>
                </div>
                <div className="BackgroundImageCarouselAuthor">
                  <NavLink to={`/users/${imageFiltered[0].userId}`}>
                    By {image.author}
                  </NavLink>
                </div>
              </div>
            )}
          </>
        );
      })}
    </>
  );
}
