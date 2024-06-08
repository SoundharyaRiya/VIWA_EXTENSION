import { React, useContext, useState } from "react";
import { removeDescribeMeButtons, scrapeContent } from "../DOMServices";

import { openAiServices } from "../Services/openAIServices";
import DescribeButton from "./DescribeButton";
import { createRoot } from "react-dom/client";
import ViwaContext, { ViwaContextProvider } from "../Store/context-api";
import viwaLogo from "../viwaLogo";
import { FaMicrophone } from "react-icons/fa";
import SummaryPopup from "./SummaryPopup";

const Popup = ({ showPopup }) => {
  const [showDescribeImages, setShowDescribeImages] = useState(false);
  const [isRecordingActive, setIsRecordingActive] = useState(false);
  const [voiceInput, setVoiceInput] = useState();

  const viwaContext = useContext(ViwaContext);
  const handleSummarize = async () => {
    viwaContext.handleSetCurrentAction("Summarizing...");
    const currentUrl = window.location.href;
    scrapeContent(currentUrl)
      .then((res) => {
        openAiServices
          .summarize(res)
          .then((res) => {
            viwaContext.handleSetSummarization(res.data.data.response);
            viwaContext.handleSetCurrentAction();
          })
          .catch((err) => {
            console.log(err);
            viwaContext.handleSetCurrentAction();
          });
      })
      .catch((err) => {
        console.log(err);
        viwaContext.handleSetCurrentAction();
      });
  };

  const handleOnDescribe = (imgSrc) => {
    viwaContext.handleSetCurrentAction("Image analysis...");
    return new Promise((resolve, reject) => {
      openAiServices
        .describeImage(imgSrc)
        .then((res) => {
          viwaContext.handleSetCurrentAction();
          resolve(res.data.data.response);
        })
        .catch((err) => {
          console.log(err);
          reject("Error occured :(");
          viwaContext.handleSetCurrentAction();
        });
    });
  };

  const handleDescribeImage = () => {
    if (!showDescribeImages) {
      setShowDescribeImages(true);
      const images = document.querySelectorAll(".viwa-img-portal");
      images.forEach((image) => {
        const imageSrc = image.previousElementSibling.getAttribute("src");
        const portalContainer = document.createElement("div");
        portalContainer.classList.add("viwa-portal-close");
        image.appendChild(portalContainer);
        const root = createRoot(portalContainer);
        root.render(
          <ViwaContextProvider>
            <DescribeButton onDescribe={handleOnDescribe} imgSrc={imageSrc} />
          </ViwaContextProvider>
        );
      });
    } else {
      removeDescribeMeButtons();
      setShowDescribeImages(false);
    }
  };

  const handleStartListening = () => {
    viwaContext.handleSetCurrentAction("Listening...");
    const recognition =
      new webkitSpeechRecognition() || new SpeechRecognition();

    recognition.interimResults = true;
    recognition.continuous = true;
    recognition.start();
    recognition.onresult = (event) => {
      const result = event.results[event.results.length - 1][0].transcript;
      const isFinal = event.results[0].isFinal;
      if (isFinal) {
        recognition.stop();
        console.log("User has stopped speaking");
      }
      setVoiceInput(result);
      console.log(result);
    };
    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      viwaContext.handleSetCurrentAction();
    };

    recognition.onend = () => {
      console.log("Voice recording finished");
      viwaContext.handleSetCurrentAction();
    };

    recognition.onnomatch = () => {
      console.log("No speech was recognized.");
    };
  };

  return (
    <div
      id="assistWindow"
      className={`${showPopup === "off" ? "hidden" : "show"} assistWindow`}
    >
      <div className="logoContainerViwa">
        <img src={viwaLogo} alt="Viwa logo" />
      </div>
      <div className="headingsViwa">
        <p className="assistWindowMainHeading">Hello, I'm VIWA</p>
        <p className="assistWindowSubHeading">How can I assist you today?</p>
      </div>
      <div className="funcContainerViwa">
        <FaMicrophone onClick={handleStartListening} className="viwaIcon" />
        <div className="buttonContainerViwa">
          <button className="VIWA-Popup-Btn" onClick={handleSummarize}>
            {viwaContext.currentAction === "Summarizing..."
              ? "In progress.."
              : "Summarize"}
          </button>
          <button className="VIWA-Popup-Btn" onClick={handleDescribeImage}>
            {showDescribeImages ? "Stop describing" : "Describe Images"}
          </button>
        </div>
      </div>
      {viwaContext.summarization?.length > 0 && <SummaryPopup />}
    </div>
  );
};

export default Popup;
