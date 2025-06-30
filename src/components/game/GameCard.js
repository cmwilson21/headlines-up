import React, { useEffect, useState } from "react";
import CongratsCard from "./CongratsCard.js";
import RadioButtons from "./RadioButtons.js";
import IncorrectCard from "./IncorrectCard.js";
import "./game-components.css";
import { useSelector, useDispatch } from "react-redux";
import { guess } from "../../actions/sessionsAction.js";

// The game card presents the game.

const GameCard = ({ article, nextButton }) => {
  const dispatch = useDispatch();
  const { score, isGuessCorrect, lastSource } = useSelector(
    (state) => state.auth
  );

  const [selection, setSelection] = useState("");
  const [hasGuessed, setHasGuessed] = useState(false);
  const changeHandler = (source) => {
    console.log("source2", source);
    return () => {
      setSelection(source);
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("submitting", selection);
    if (hasGuessed) {
      return;
    }
    await dispatch(guess(article.hash, selection));
    setHasGuessed(true);
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

      {/* TODO: Fix disabled buttons or make them only appear when needed */}
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
      <button
        className="next-button"
        onClick={nextButton}
        disabled={!hasGuessed}
      >
        Next
      </button>

      {hasGuessed && isGuessCorrect && (
        <CongratsCard article={article} source={lastSource} />
      )}
      {hasGuessed && !isGuessCorrect && (
        <IncorrectCard article={article} source={lastSource} />
      )}
    </div>
  );
};

export default GameCard;
