import React, { useState } from "react";

const ViwaContext = React.createContext({
  showDescriptionPopup: null,
  currentAction: null,
  summarization: null,
  handleSetSummarization: () => {},
  handleSetImageDescription: () => {},
  handleSetShowDescriptionPopup: () => {},
  handleSetCurrentAction: () => {},
});

export default ViwaContext;

export const ViwaContextProvider = ({ children }) => {
  const [summarization, setSummarization] = useState();
  const [showDescriptionPopup, setShowDescriptionPopup] = useState(false);
  const [currentAction, setCurrentAction] = useState();

  const handleSetShowDescriptionPopup = (value) => {
    setShowDescriptionPopup(value);
  };

  const handleSetCurrentAction = (message) => {
    setCurrentAction(message);
  };

  const handleSetSummarization = (value) => {
    setSummarization(value);
  };

  return (
    <ViwaContext.Provider
      value={{
        showDescriptionPopup,
        currentAction,
        summarization,
        handleSetSummarization,
        handleSetShowDescriptionPopup,
        handleSetCurrentAction,
      }}
    >
      {children}
    </ViwaContext.Provider>
  );
};
