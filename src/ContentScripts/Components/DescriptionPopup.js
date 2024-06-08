import { useContext } from "react";
import ViwaContext from "../Store/context-api";

const DescriptionPopup = ({ handleClosePopup }) => {
  const viwaContext = useContext(ViwaContext);

  return (
    <div className="descriptionWindow">
      <h4>{viwaContext.imageDescription}</h4>
      <button onClick={handleClosePopup}>Close</button>
    </div>
  );
};

export default DescriptionPopup;
