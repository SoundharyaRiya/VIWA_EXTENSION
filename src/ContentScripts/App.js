import React, { useCallback, useContext, useEffect, useState } from "react";
import AssistButton from "./Components/AssistButton";
import ViwaContext from "./Store/context-api";
import Popup from "./Components/Popup";
import DescriptionPopup from "./Components/DescriptionPopup";

const App = () => {
  const [showPopup, setShowPopup] = useState("initial");
  const viwaContext = useContext(ViwaContext);

  const initializeImageDescriptionRoots = useCallback(() => {
    const images = document.querySelectorAll("img");

    images.forEach((img) => {
      if (!img.id.includes("viwa") && img.width >= 50 && img.height >= 50) {
        const describeRootElement = document.createElement("div");
        describeRootElement.classList.add("viwa-img-portal");
        img.insertAdjacentElement("afterend", describeRootElement);
      }
    });
  }, [document]);

  useEffect(() => {
    initializeImageDescriptionRoots();
  }, [initializeImageDescriptionRoots]);

  const handleShowPopup = () => {
    setShowPopup((prevState) => {
      let updatedState;
      if (prevState === "initial") {
        updatedState = "on";
      } else if (prevState === "on") {
        updatedState = "off";
      } else if (prevState === "off") {
        updatedState = "on";
      }
      return updatedState;
    });
  };

  const handleClosePopup = () => {
    viwaContext.handleSetShowDescriptionPopup(false);
  };
  return (
    <React.Fragment>
      <AssistButton handleShowPopup={handleShowPopup} />
      {showPopup !== "initial" && <Popup showPopup={showPopup} />}
    </React.Fragment>
  );
};

export default App;
