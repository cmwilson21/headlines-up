import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadArticle } from "../../actions/articleAction";

const CongratsCard = ({ article }) => {
  return (
    <div>
      <div className="congrats-card">
        <div className="congrats-card-body">
          <h5 className="congrats-card-title text-green">Congratulations!</h5>
          <p className="congrats-card-text">You answered correctly!</p>
          <img
            src={article.urlToImage}
            component="img"
            height="250"
            width="auto"
          />
          <h5>{article.title}</h5>
          <p>{article.description}</p>
          <p>
            {article.content}...{" "}
            <a href={article.url} target="_blank">
              view full article.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

const CardBody = ({ article, nextButton }) => {
  const [selection, setSelection] = useState("");
  const [isGuessCorrect, setIsGuessCorrect] = useState("");
  const [score, setScore] = useState(() => JSON.parse(localStorage.getItem("score")) || 0);

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
    setIsGuessCorrect(isCorrect);
    if (isCorrect) {
      console.log("correct");
      setIsGuessCorrect("correct");
      setScore(score + 1);
      console.log("Score", score);
    } else {
      console.log("incorrect");
    }
  };

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
      <div className="radio-buttons">
        <RadioButtonsList
          options={radioOptions}
          selection={selection}
          changeHandler={changeHandler}
        />
      </div>
      <br />
      <p>Score: {score}</p>
      <div className="submit-button">
        <button onClick={submitHandler}>Submit</button>
      </div>
      <button onClick={nextButton}>Next</button>

      {isGuessCorrect && <CongratsCard article={article} />}
      {isGuessCorrect && <p>Incorrect, guess again!</p>}
    </div>
  );
};

export const GameCard = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.article);
  // This gets us the whole list of articles ^^
  const [articleNumber, setArticleNumber] = useState(0);
  const article = articles[articleNumber];

  if (articleNumber === articles.length - 1) {
    dispatch(loadArticle());
  }

  useEffect(() => {
    dispatch(loadArticle());
  }, [dispatch]);
  console.log("article", article);

  const nextButton = () => {
    setArticleNumber(articleNumber + 1);
  };

  if (article) {
    return (
      <div>
        <div className="card">
          <CardBody
            article={article}
            nextButton={nextButton}
            key={articleNumber}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
};
