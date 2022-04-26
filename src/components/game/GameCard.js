import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadArticle } from "../../actions/articleAction";

export const GameCard = () => {
  const dispatch = useDispatch();
  const articles = useSelector(
    (state) => state.article[Math.floor(Math.random() * state.article.length)]
  );

  useEffect(() => {
    dispatch(loadArticle());
  }, [dispatch]);
  console.log("articles", articles);

  if (articles) {
    return (
      <div>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{articles.title}</h5>
            <p className="card-text">{articles.description}</p>
            <p>{articles.content}</p>
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
