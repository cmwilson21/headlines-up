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

  // const randomArticle = articles[Math.floor(Math.random() * articles.length)];

  // create and array of random articles from the api
  // const randomArticles = [];
  // for (let i = 0; i < 3; i++) {
  //   randomArticles.push(articles[Math.floor(Math.random() * articles.length)]);
  // }

  // console.log("randomArticles", randomArticles);

  // const singleArticle = articles[0];
  // console.log("article2", article);
  // const randomArticle =
  //   articles.articles[Math.floor(Math.random() * articles.articles.length)];
  // console.log("rando", randomArticle);
  if (articles) {
    return (
      <div>
        <div className="card">
          <div className="card-body">
            {/* <h5 className="card-title">{randomArticle.title}</h5>
          <p className="card-text">{randomArticle.body}</p> */}
            <h5 className="card-title">{articles.title}</h5>
            <p className="card-text">{articles.body}</p>
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
