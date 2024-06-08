import React, { useContext, useEffect } from "react";
import "../contentStyle.css";
import viwaLogo from "../viwaLogo";
import ViwaContext from "../Store/context-api";
import { removeDescribeMeButtons } from "../DOMServices";

const AssistButton = ({ showPopup, handleShowPopup }) => {
  useEffect(() => {
    if (!showPopup) {
      removeDescribeMeButtons();
    }
  }, [showPopup]);
  const viwaContext = useContext(ViwaContext);

  return (
    <React.Fragment>
      <div id="assistButton" className="assistContainer">
        <img id="viwaLogoAssist" src={viwaLogo} className="assistLogo" />
        <button onClick={handleShowPopup} className="assistBtn">
          {viwaContext.currentAction ? viwaContext.currentAction : "Assist me!"}
        </button>
      </div>
    </React.Fragment>
  );
};

export default AssistButton;
