import "./Carousel.css";
import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export function CarouselSplashPage() {
  const [backgroundImageNumber, setBackgroundImageNumber] = useState(0);
  let imageArray;

  const images = {
    1: {
      imageUrl:
        "https://combo.staticflickr.com/ap/build/images/sohp/2020-top-25/Fantasy_Island_Daniel_Cheong.jpg",
      title: "Fantasy Island",
      author: "Daniel Cheong",
    },
    2: {
      imageUrl:
        "https://combo.staticflickr.com/ap/build/images/sohp/2020-top-25/Secluded_Pete_Rowbottom.jpg",
      title: "Secluded",
      author: "Pete Rowbottom",
    },
    3: {
      imageUrl:
        "https://combo.staticflickr.com/ap/build/images/sohp/2020-top-25/Untitled_Jorge_Guadalupe_Lizarraga.jpg",
      title: "Albuquerque, New Mexico",
      author: "Jorge Guadalupe Lizarrága",
    },
    4: {
      imageUrl:
        "https://combo.staticflickr.com/ap/build/images/sohp/2020-top-25/Europes_best_View_Fabian_Fortmann.jpg",
      title: "Europe's Best View",
      author: "Fabian Fortmann",
    },
    5: {
      imageUrl:
        "https://combo.staticflickr.com/ap/build/images/sohp/2020-top-25/Mists_of_renfrew_Adam_Gibbs.jpg",
      title: "Mists of Renfrew",
      author: "Adam Gibbs",
    },
    6: {
      imageUrl:
        "https://combo.staticflickr.com/ap/build/images/sohp/2020-top-25/sunset_1663_Junji_Aoyama.jpg",
      title: "Sunset 1663",
      author: "Junji Aoyama",
    },
    7: {
      imageUrl:
        "https://combo.staticflickr.com/ap/build/images/sohp/2020-top-25/Tree_and_Morning_Mist_Jos_Buurmans.jpg",
      title: "Tree and Morning Mist",
      author: "Jos Buurmans",
    },
    8: {
      imageUrl:
        "https://combo.staticflickr.com/ap/build/images/sohp/2020-top-25/Desert_Beauty_Christoph_Fischer.jpg",
      title: "Desert Beauty",
      author: "Christoph Fischer",
    },
    9: {
      imageUrl:
        "https://combo.staticflickr.com/ap/build/images/sohp/2020-top-25/Catwalk_am_Bahnhof_Zurich_Oerlikon_Peter_Arn.jpg",
      title: "Catwalk am Bahnhof Zürich Oerlikon",
      author: "Peter Arn",
    },
    10: {
      imageUrl:
        "https://combo.staticflickr.com/ap/build/images/sohp/2020-top-25/Dawn_of_Another_Day_Sky_Matthews.jpg",
      title: "Dawn of Another Day",
      author: "Sky Matthews",
    },
  };

  imageArray = Object.values(images);
  // console.log(imageArray);

  // useEffect to map through the length of the imageArray infinitely while setting an image number
  useEffect(() => {
    if (imageArray) {
      if (backgroundImageNumber < imageArray.length) {
        const backgroundImageTransition = setInterval(() => {
          setBackgroundImageNumber(
            (previousBackgroundImageNumber) =>
              (previousBackgroundImageNumber + 1) % imageArray.length
          );
        }, 5000);
        return () => clearInterval(backgroundImageTransition);
      } else {
        setBackgroundImageNumber(0);
      }
    }
  }, [backgroundImageNumber]);

  return (
    <>
      {imageArray &&
        imageArray.map((image, index) => {
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
                {index == backgroundImageNumber && (
                  <img
                    className="imageCarouselArray"
                    src={image.imageUrl}
                    alt="CarouselImageBackground"
                  />
                )}
              </div>
              <div
                className={
                  index == backgroundImageNumber
                    ? "ActiveImageCaptionsCarousel"
                    : "InactiveImageCaptionsCarousel"
                }
                key={index}
              >
                {index == backgroundImageNumber && (
                  <>
                    <div className="BackgroundImageCarouselTitle">
                      {image.title}
                    </div>
                    <div className="BackgroundImageCarouselAuthor">
                      By {image.author}
                    </div>
                  </>
                )}
              </div>
            </>
          );
        })}
    </>
  );
}
