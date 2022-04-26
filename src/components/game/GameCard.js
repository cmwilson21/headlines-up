import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadArticle } from "../../actions/articleAction";

export const GameCard = () => {
  const dispatch = useDispatch();
  const articles = useSelector(
    (state) => state.article[Math.floor(Math.random() * state.article.length)]
  );
  // const [apNews, setAPNews] = useState(false);
  // const [bbcNews, setBBCNews] = useState(false);
  // const [cnnNews, setCNNNews] = useState(false);
  // const [foxNews, setFoxNews] = useState(false);
  // const [reutersNews, setReutersNews] = useState(false);
  const [selection, setSelection] = useState("ap-news");

  const handleAPChange = () => {
    setSelection("ap-news");
  };

  const handleBBCChange = () => {
    setSelection("bbc-news");
  };

  const handleCNNChange = () => {
    setSelection("cnn-news");
  };

  const handleFoxChange = () => {
    setSelection("fox-news");
  };

  const handleReutersChange = () => {
    setSelection("reuters-news");
  };

  useEffect(() => {
    dispatch(loadArticle());
  }, [dispatch]);
  console.log("articles", articles);

  const RadioButton = ({ label, value, onChange }) => {
    return (
      <label>
        <input type="radio" checked={value} onChange={onChange} />
        {label}
      </label>
    );
  };

  if (articles) {
    return (
      <div>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{articles.title}</h5>
            <p className="card-text">{articles.description}</p>
            <p>{articles.content}</p>
            <RadioButton
              label="AP News"
              value={selection === "ap-news"}
              onChange={handleAPChange}
            />
            <RadioButton
              label="BBC News"
              value={selection === "bbc-news"}
              onChange={handleBBCChange}
            />
            <RadioButton
              label="CNN News"
              value={selection === "cnn-news"}
              onChange={handleCNNChange}
            />
            <RadioButton
              label="Fox News"
              value={selection === "fox-news"}
              onChange={handleFoxChange}
            />
            <RadioButton
              label="Reuters"
              value={selection === "reuters-news"}
              onChange={handleReutersChange}
            />
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
