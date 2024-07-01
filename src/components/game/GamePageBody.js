import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadArticle } from "../../actions/articleAction";
import GameCard from "./GameCard";

// The GamePageBody component is the main component for the game page. It is responsible for rendering the game card and the next button.

export const GamePageBody = () => {
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
      <div className="card-container">
        <div className="card">
          <GameCard
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

export default GamePageBody;
