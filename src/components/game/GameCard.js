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
const RadioButton = ({ label, value, onChange }) => {
  return (
    <label>
      <input type="radio" checked={value} onChange={onChange} />
      {label}
    </label>
  );
};

const CardBody = ({ article, nextButton }) => {
  const [selection, setSelection] = useState("");
  const [isGuessCorrect, setIsGuessCorrect] = useState("");
  const [score, setScore] = useState(() => {
    const savedScore = localStorage.getItem("score");
    return savedScore ? JSON.parse(savedScore) : 0;
  });

  useEffect(() => {
    localStorage.setItem("score", JSON.stringify(score));
  }, [score]);

  const changeHandler = (source) => {
    return () => {
      setSelection(source);
    };
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submitting", selection);
    console.log("source id", article.source.id);
    if (selection === article.source.id) {
      console.log("correct");
      setIsGuessCorrect("correct");
      setScore(score + 1);
      console.log("Score", score);
    } else {
      setIsGuessCorrect("incorrect");
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
      <RadioButton
        label="AP News"
        value={selection === "associated-press"}
        onChange={changeHandler("associated-press")}
      />
      <RadioButton
        label="BBC News"
        value={selection === "bbc-news"}
        onChange={changeHandler("bbc-news")}
      />
      <RadioButton
        label="CNN News"
        value={selection === "cnn"}
        onChange={changeHandler("cnn")}
      />
      <RadioButton
        label="Fox News"
        value={selection === "fox-news"}
        onChange={changeHandler("fox-news")}
      />
      <RadioButton
        label="Reuters"
        value={selection === "reuters"}
        onChange={changeHandler("reuters")}
      />
      <br />
      <p>Score: {score}</p>
      <div className="submit-button">
        <button onClick={submitHandler}>Submit</button>
      </div>
      <button onClick={nextButton}>Next</button>

      {isGuessCorrect === "correct" && <CongratsCard article={article} />}
      {isGuessCorrect === "incorrect" && <p>Incorrect, guess again!</p>}
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
