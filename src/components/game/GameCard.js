import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadArticle } from "../../actions/articleAction";

export const GameCard = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.article);

  useEffect(() => {
    dispatch(loadArticle());
  }, [dispatch]);
  console.log("articles", articles);

  // const singleArticle = articles[0];
  // console.log("article2", article);

  return <div>GameCard</div>;
};
