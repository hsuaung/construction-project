import React from "react";
import PropTypes from "prop-types";

export default function InputBoxOriginal({ info, inputTitle, instruction, filetype }) {
  return (
    <div className="inputBox">
      <label htmlFor="" className="inputLabel">
        <div className="flexRow">
          <small>[{info}]</small>
          <p>{inputTitle}</p>
        </div>
        <div>
          <small>{instruction}</small>
        </div>
      </label>
      <input type={filetype} name={inputTitle.toLowerCase()} id={inputTitle.toLowerCase()} />
    </div>
  );
}

// PropTypes for type-checking
InputBoxOriginal.propTypes = {
  info: PropTypes.string,
  inputTitle: PropTypes.string.isRequired,
  instruction: PropTypes.string,
  filetype: PropTypes.string,
};

// Default props for optional props
InputBoxOriginal.defaultProps = {
  info: "",
  instruction: "",
  filetype: "text",
};
