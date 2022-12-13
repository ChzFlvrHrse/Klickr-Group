import React from "react";
import "./devs.css";
import KevPic from '../../icons/KevD-Profile-Image.png'
import JusPic from '../../icons/Jus-Profile-Image.jpeg'
import NatePic from '../../icons/Nate-Profile-Image.jpeg'
import defaultPic from '../../icons/default-profile-image.jpeg'
import githubIcon from '../../icons/githubIcon.png'
import linkedIcon from '../../icons/linkedin-icon.png'
import KeanenPic from '../../icons/Keanen-profile-img.png'

export function AboutDevs() {

    // TEST RENDER DEPLOYMENT

    return (
        <div className="about-devs-container">
            <div className="about-devs-wrapper">
                <div className="about-us-title-container">
                    <h2 className="about-us-title">About us</h2>
                    <div className="repo-title">Project Github Repo: </div>
                    <a href="https://github.com/ChzFlvrHrse/Klickr-Group" target="_blank">
                        <h4 className="repo-link">
                            https://github.com/ChzFlvrHrse/Klickr-Group
                        </h4>
                    </a>
                    <div className="team-title">The Team</div>
                </div>
                <div className="team-container">
                    <div className="member-container">
                        <div className="member-pic-name">
                            <img className="dev-profile-pic" src={NatePic}></img>
                            <div className="dev-name">Nate Scott</div>
                        </div>
                        <div className="dev-info-contatiner">
                            <a className="links-container" href="https://github.com/ChzFlvrHrse" target="_blank">
                                <img className="github-icon" src={githubIcon}></img>
                                <div className="linked-titles">Github</div>
                            </a>
                            <a className="links-container" href='https://www.linkedin.com/in/nathan-scott-0a7264183/' target="_blank">
                                <img className="linkedin-icon" src={linkedIcon}></img>
                                <div className="linked-titles">LinkedIn</div>
                            </a>
                        </div>
                    </div>
                    <div className="member-container">
                        <div className="member-pic-name">
                            <img className="dev-profile-pic" src={JusPic}></img>
                            <div className="dev-name">Justin Gu</div>
                        </div>
                        <div className="dev-info-contatiner">
                            <a className="links-container" href="https://github.com/Justinguu" target="_blank">
                                <img className="github-icon" src={githubIcon}></img>
                                <div className="linked-titles">Github</div>
                            </a>
                            <a className="links-container" href='https://www.linkedin.com/in/jung-gu-b69b98154/' target="_blank">
                                <img className="linkedin-icon" src={linkedIcon}></img>
                                <div className="linked-titles">LinkedIn</div>
                            </a>
                        </div>
                    </div>
                    <div className="member-container">
                        <div className="member-pic-name">
                            <img className="dev-profile-pic" src={KeanenPic}></img>
                            <div className="dev-name">Keanen Bafekr</div>
                        </div>
                        <div className="dev-info-contatiner">
                            <a className="links-container" href="https://github.com/Kbafekr" target="_blank">
                                <img className="github-icon" src={githubIcon}></img>
                                <div className="linked-titles">Github</div>
                            </a>
                            <a className="links-container" href='https://www.linkedin.com/in/keanen-bafekr-8a498a123/' target="_blank">
                                <img className="linkedin-icon" src={linkedIcon}></img>
                                <div className="linked-titles">LinkedIn</div>
                            </a>
                        </div>
                    </div>
                    <div className="member-container">
                        <div className="member-pic-name">
                            <img className="dev-profile-pic" src={KevPic}></img>
                            <div className="dev-name">Kevin Duong</div>
                        </div>
                        <div className="dev-info-contatiner">
                            <a className="links-container" href="https://github.com/Kevin-D47" target="_blank">
                                <img className="github-icon" src={githubIcon}></img>
                                <div className="linked-titles">Github</div>
                            </a>
                            <a className="links-container" href='https://www.linkedin.com/in/kevin-duong-513341216/' target="_blank">
                                <img className="linkedin-icon" src={linkedIcon}></img>
                                <div className="linked-titles">LinkedIn</div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
