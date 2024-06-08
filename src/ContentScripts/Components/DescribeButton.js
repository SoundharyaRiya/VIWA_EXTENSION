import { useEffect, useRef, useState } from "react";
import { typeStringIntoElement } from "../DOMServices";

const DescribeButton = ({ onDescribe, imgSrc }) => {
  const btnRef = useRef();
  const [buttonState, setButtonState] = useState({
    state: "active",
    text: "Describe me",
  });
  const handleClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setButtonState({ state: "disabled", text: "Analyzing..." });
    onDescribe(imgSrc)
      .then((result) => {
        setButtonState({ state: "disabled", text: result });
      })
      .catch((result) => setButtonState({ state: "error", text: result }));
  };

  useEffect(() => {
    btnRef.current.textContent = "";
    if (buttonState.text.length > 40) {
      typeStringIntoElement(buttonState.text, btnRef.current, 10);
    } else {
      typeStringIntoElement(buttonState.text, btnRef.current);
    }
  }, [buttonState]);

  useEffect(() => {
    if (buttonState.state === "error") {
      setTimeout(() => {
        setButtonState({ state: "disabled", text: "Not valid" });
      }, 10000);
    }
  }, [buttonState]);

  return (
    <button
      ref={btnRef}
      disabled={buttonState.state === "disabled"}
      className={`VIWA-Describe-Btn ${
        buttonState.state === "disabled" || buttonState.state === "error"
          ? ""
          : "VIWA-Describe-Btn-Animation VIWA-Describe-Btn-Animation-Hover"
      }`}
      onClick={handleClick}
    ></button>
  );
};

export default DescribeButton;
