import "./App.css";
import "./WordsWorthTeam.css";
import React from "react";
import image from "./logo.jpg";
import slider1 from "./r1.jpg";
import slider2 from "./r2.jpg";
import slider3 from "./r3.jpg";
import img1 from "./images/caricature-dimitri.svg";
import img3 from "./images/caricature-quentin_b.svg";
import downloadBg from "./images/downloadBG.jpg";
import appStore from "./images/app-store.png";
import playStore from "./images/google-play.png";
import android from "./images/android-button.png";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import FadeInSection from "./FadeInSection.js";
import ReportProblem from "./ReportProblem.js";
var images = [slider1, slider2, slider3];
function App() {
  return (
    <div className="App">
      <div className="Header">
        <div className="logoContainer">
          <img src={image} alt="Logo" className="logo" />
        </div>
        <div className="headerTitle">
          <h1>WORDS WORTH</h1>
        </div>
      </div>
      <div className="Body">
        <div className="Slider">
          <Slide>
            <div className="each-slide">
              <img src={images[0]} alt="slider" />
            </div>
            <div className="each-slide">
              <img src={images[1]} alt="slider" />
            </div>
            <div className="each-slide">
              <img src={images[2]} alt="slider" />
            </div>
          </Slide>
        </div>
        <div className="aboutUs">
          <div id="bgcolor"></div>
          <div id="ourStory">
            <p id="storyHeader">OUR STORY</p>
            <img src={image} alt="ABOUT US" />
            <div className="story">
              <p>
                Books, an essential source of information. In today’s digital
                world, the internet is our primary source of information.
                Eveything is available with a single click. However, finding
                books on the internet can still be a difficult task. Being
                visually impaired makes this task even more difficult.
              </p>
              <p>
                WORDSWORTH, a mobile application with the purpose of helping
                visually impaired people to find books using voice commands and
                listen to those books in audio format. The enhanced mode of our
                application helps visually impaired users to access different
                books via speech recognition. The books will be searched and
                converted into an audio format for visually impaired users to
                listen to.
              </p>
              <p>
                The application is also availble for normal people. The users
                can find, download, read and manage their books. They are able
                to create their personal libraries and manage their book
                collections. In addition, the users are able to interact with
                each other via the application's socail segment where they can
                post and recommend about books. Also using articficial
                intelligence, the system will recommend books to its users based
                on their library.
              </p>
            </div>
          </div>
        </div>
        <FadeInSection>
          <div
            style={{
              backgroundColor: "rgb(51, 51, 51)",
              textAlign: "center",
              paddingTop: "7px",
              paddingBottom: "7px",
            }}
          >
            <div id="pageTitle1">
              <p>OUR TEAM</p>
            </div>
            <div className="teamApp">
              <div className="columns" className="fadeIn">
                <div id="team">
                  <div>
                    <p id="teamTitle">OSAMA ZAFAR</p>
                    <p id="teamPos">DEVELOPER</p>
                  </div>
                  <img className="imgMobileSize" src={img3} alt="DEVELOPER" />
                </div>
              </div>
              <div className="columns" id="rightColumn" className="fadeIn">
                <div id="team">
                  <img
                    className="imgMobileSize"
                    id="imgRight"
                    src={img1}
                    alt="DEVELOPER"
                  />
                  <div>
                    <p id="teamTitle">SYED SHAZAIB</p>
                    <p id="teamPos">DEVELOPER</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>
        <div className="Features">
          <p id="featureTitle">Key Features</p>
          <div id="featureRow">
            <div id="featureBox">
              <p id="featureBoxTitle">Voice Navigation</p>
              <p id="featureBoxDes">
                For visually impaired users to navigate through system via
                voice.
              </p>
            </div>
            <div id="featureBox">
              <p id="featureBoxTitle">Book Collections</p>
              <p id="featureBoxDes">
                Mark specific books and add them in a collection.
              </p>
            </div>
            <div id="featureBox">
              <p id="featureBoxTitle">AudioBook Collection</p>
              <p id="featureBoxDes">
                Mark specific audio-books and add them in a collection.
              </p>
            </div>
          </div>
          <div id="featureRow">
            <div id="featureBox">
              <p id="featureBoxTitle">Search Books</p>
              <p id="featureBoxDes">
                A fast and efficient search engine for searching e-books.
              </p>
            </div>
            <div id="featureBox">
              <p id="featureBoxTitle">Book Recommendation</p>
              <p id="featureBoxDes">
                An artificail intellengence algorithm suggesting books based on
                the user's personal library.
              </p>
            </div>
            <div id="featureBox">
              <p id="featureBoxTitle">Socail Segment</p>
              <p id="featureBoxDes">
                A social networking segment, which joins our users together, let
                them share their interest, and recommend books to each other.
              </p>
            </div>
          </div>
          <div id="featureRow">
            <div id="featureBox">
              <p id="featureBoxTitle">Audio Player</p>
              <p id="featureBoxDes">
                An audio book player converting readable books to audio for the
                users to hear.
              </p>
            </div>
            <div id="featureBox">
              <p id="featureBoxTitle">Book Reader</p>
              <p id="featureBoxDes">
                A simple and easy to use book reader allowing our users to read
                books.
              </p>
            </div>
            <div id="featureBox">
              <p id="featureBoxTitle">Narrator Configuration</p>
              <p id="featureBoxDes">
                Listen your books in the voice of your selected narrator
              </p>
            </div>
          </div>
        </div>
        <div className="downloadSection">
          <p>One app for everyday needs</p>
          <div id="downloadLinks">
            <img id="downloadImg" src={appStore} alt="App Store" />
            <img id="downloadImg" src={playStore} alt="Google Play Store" />
            <img id="downloadImg" src={android} alt="Android Direct Link" />
          </div>
          <img src={downloadBg} alt="Download Background" />
        </div>
        <div className="reportProblemSection">
          <p id="featureTitle">Report A Problem</p>
          <div className="reportProblem">
            <ReportProblem />
          </div>
        </div>
        <div className="footer">
          <p id="footerTitle">WORDS WORTH</p>
          <p id="footerText">Copyright &#xa9; 2021 WordsWorth, Inc.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
