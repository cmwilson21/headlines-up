import React, { useState } from "react";

const RadioButtons = ({ changeHandler, selection }) => {
  // const [selection, setSelection] = useState("");

  // set radioOptions to an array of objects
  const radioOptions = [
    { label: "AP News", value: "associated-press" },
    { label: "BBC News", value: "bbc-news" },
    { label: "CNN News", value: "cnn" },
    { label: "Fox News", value: "fox-news" },
    { label: "Reuters", value: "reuters" },
  ];

  // the radio button component defines what we are looking for in the radio button - the label is the text that will be displayed, the value is the value that will be passed to the changeHandler, and the onChange is the function that will be called when the radio button is clicked
  const RadioButton = ({ label, value, onChange }) => {
    return (
      <label>
        <input type="radio" checked={value} onChange={onChange} />
        {label}
      </label>
    );
  };

  // const changeHandler = (source) => {
  //   console.log("source2", source);
  //   return () => {
  //     setSelection(source);
  //   };
  // };

  // the radio button list component maps over the radioOptions array and creates a radio button for each option
  const RadioButtonsList = ({ options, selection, changeHandler }) => {
    console.log("options", options);
    return options.map((option) => (
      <RadioButton
        key={option.value}
        label={option.label}
        value={selection === option.value}
        onChange={changeHandler(option.value)}
      />
    ));
  };
  return (
    <div>
      <RadioButtonsList
        options={radioOptions}
        selection={selection}
        changeHandler={changeHandler}
      />
    </div>
  );
};

export default RadioButtons;
