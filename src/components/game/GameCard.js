import React, { useEffect, useState } from "react";
import CongratsCard from "./CongratsCard.js";
import RadioButtons from "./RadioButtons.js";

// The game card presents the game.

const GameCard = ({ article, nextButton }) => {
  const [selection, setSelection] = useState("");
  const [isGuessCorrect, setIsGuessCorrect] = useState("");
  const [score, setScore] = useState(
    () => JSON.parse(localStorage.getItem("score")) || 0
  );
  const [hasGuessed, setHasGuessed] = useState(false);

  useEffect(() => {
    localStorage.setItem("score", JSON.stringify(score));
  }, [score]);

  const changeHandler = (source) => {
    console.log("source2", source);
    return () => {
      setSelection(source);
    };
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submitting", selection);
    console.log("source id", article.source.id);
    const isCorrect = selection === article.source.id;
    setHasGuessed(true);
    setIsGuessCorrect(isCorrect);
    if (isCorrect) {
      console.log("correct");
      setScore(score + 1);
      console.log("Score", score);
    } else {
      console.log("incorrect");
    }
  };

  return (
    <div className="card-body">
      <h3 className="card-title">
        {article.title.replace(
          /\bAP\b|BBC|CNN|Reuters|Fox News/g,
          "(news source)"
        )}
      </h3>
      <p className="card-text">
        {article.description.replace(
          /\bAP\b|BBC|CNN|Reuters|Fox News/g,
          "(news source)"
        )}
      </p>
      <RadioButtons changeHandler={changeHandler} selection={selection} />
      <br />
      <p>Score: {score}</p>
      <div className="submit-button">
        <button onClick={submitHandler}>Submit</button>
      </div>
      <button onClick={nextButton}>Next</button>

      {hasGuessed && isGuessCorrect && <CongratsCard article={article} />}
      {hasGuessed && !isGuessCorrect && <p>Incorrect, guess again!</p>}
    </div>
  );
};

export default GameCard;
