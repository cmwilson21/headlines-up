import React, { useEffect, useState } from "react";
import CongratsCard from "./CongratsCard.js";
import RadioButtons from "./RadioButtons.js";
import IncorrectCard from "./IncorrectCard.js";
import "./game-components.css";
import { useSelector, useDispatch } from "react-redux";
import { updateScore } from "../../actions/sessionsAction.js";

// The game card presents the game.

const GameCard = ({ article, nextButton }) => {
  const dispatch = useDispatch();
  const score = useSelector((state) => state.auth.score);

  const [selection, setSelection] = useState("");
  const [isGuessCorrect, setIsGuessCorrect] = useState("");
  const [hasGuessed, setHasGuessed] = useState(false);

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
    if (hasGuessed) {
      return;
    }
    const isCorrect = selection === article.source.id;
    setHasGuessed(true);
    setIsGuessCorrect(isCorrect);
    if (isCorrect) {
      console.log("correct");
      dispatch(updateScore(score + 1));
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
      <RadioButtons
        className="radio-buttons"
        changeHandler={changeHandler}
        disabled={hasGuessed}
        selection={selection}
      />
      <br />
      <p>Score: {score}</p>
      <div className="submit-button">
        <button onClick={submitHandler} disabled={hasGuessed}>
          Submit
        </button>
      </div>
      <button className="next-button" onClick={nextButton}>
        Next
      </button>

      {hasGuessed && isGuessCorrect && <CongratsCard article={article} />}
      {/* {hasGuessed && !isGuessCorrect && <p>Incorrect, guess again!</p>} */}
      {hasGuessed && !isGuessCorrect && <IncorrectCard article={article} />}
    </div>
  );
};

export default GameCard;
