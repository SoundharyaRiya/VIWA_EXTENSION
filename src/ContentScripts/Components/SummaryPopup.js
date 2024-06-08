import { useContext, useEffect, useRef } from "react";
import ViwaContext from "../Store/context-api";
import { typeStringIntoElement } from "../DOMServices";

const SummaryPopup = ({}) => {
  const viwaContext = useContext(ViwaContext);
  const handleClose = () => {
    viwaContext.handleSetSummarization();
  };
  const summaryRef = useRef();
  useEffect(() => {
    typeStringIntoElement(viwaContext.summarization, summaryRef.current, 10);
  }, [viwaContext.summarization]);
  return (
    <div className="summaryPopup">
      <h2>Summary</h2>
      <p ref={summaryRef}></p>
      <button onClick={handleClose}>Close</button>
    </div>
  );
};

export default SummaryPopup;
