import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadArticle } from "../../actions/articleAction";

export const GameCard = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.article);
  // This gets us the whole list of articles ^^
  const [selection, setSelection] = useState("");
  const [articleNumber, setArticleNumber] = useState(0);
  const article = articles[articleNumber];
  // const [isSubmitted, setIsSubmitted] = useState(false);
  const [isGuessCorrect, setIsGuessCorrect] = useState("");

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
      setIsGuessCorrect(true);
      // return congratsCard();
    } else {
      console.log("incorrect");
    }
    // setIsSubmitted(true);
  };

  // create a submitHandler that will check if the user's selection matches the article's source id. If it does, the user should see the congrats card. If it doesn't, the user should see a message that says "Try again!".

  useEffect(() => {
    dispatch(loadArticle());
  }, [dispatch]);
  console.log("article", article);

  const RadioButton = ({ label, value, onChange }) => {
    return (
      <label>
        <input type="radio" checked={value} onChange={onChange} />
        {label}
      </label>
    );
  };

  const nextButton = () => {
    setArticleNumber(articleNumber + 1);
  };

  // the congrats card should display a message when the user has answered the question correctly. it should also display the article photo, title, description, and link to the article. It should also include a button to go to the next article.
  const congratsCard = () => {
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
            <p>{article.content}</p>
            <a href={article.url}>Read the article</a>
            {/* <button onClick={nextButton}>Next</button> */}
          </div>
        </div>
      </div>
    );
  };

  if (article) {
    return (
      <div>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{article.title}</h5>
            <p className="card-text">{article.description}</p>
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
              value={selection === "reuters-news"}
              onChange={changeHandler("reuters-news")}
            />
            <br />
            <button onClick={submitHandler}>Submit</button>
            <button onClick={nextButton}>Next</button>
            {/* {isSubmitted && isGuessCorrect ? congratsCard() : null} */}
            {/* if is submitted and isguesscorrect are both true, return the congratsCard, other wise, return a paragraph that says "Incorrect, guess again" */}
            {isGuessCorrect ? congratsCard() : <p>Incorrect, guess again</p>}
          </div>
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
