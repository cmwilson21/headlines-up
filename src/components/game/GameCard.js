import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadArticle } from "../../actions/articleAction";

export const GameCard = () => {
  const dispatch = useDispatch();
  const articles = useSelector(
    (state) => state.article[Math.floor(Math.random() * state.article.length)]
  );
  const [selection, setSelection] = useState("");

  const handleAPChange = () => {
    setSelection("associated-press");
  };

  const handleBBCChange = () => {
    setSelection("bbc-news");
  };

  const handleCNNChange = () => {
    setSelection("cnn");
  };

  const handleFoxChange = () => {
    setSelection("fox-news");
  };

  const handleReutersChange = () => {
    setSelection("reuters");
  };

  useEffect(() => {
    dispatch(loadArticle());
  }, [dispatch]);
  // console.log("articles", articles);

  const RadioButton = ({ label, value, onChange }) => {
    // const handleClick = (e) => {
    //   e.preventDefault();
    //   onChange(value);
    // };
    return (
      <label>
        <input
          type="radio"
          checked={value}
          onChange={onChange}
          // onClick={handleClick}
        />
        {label}
      </label>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("selection", selection);
    console.log("submit arti", articles);
    console.log("source", articles.source.id);
    if (selection === articles.source.id) {
      return alert("Correct");
    } else {
      return alert("Wrong");
    }
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
              value={selection === "associated-press"}
              onChange={handleAPChange}
              // onClick={handleClick}
              // radioId="associated-press"
            />
            <RadioButton
              label="BBC News"
              value={selection === "bbc-news"}
              onChange={handleBBCChange}
              // onClick={handleClick}
              // radioId="bbc-news"
            />
            <RadioButton
              label="CNN News"
              value={selection === "cnn"}
              onChange={handleCNNChange}
              // onClick={handleClick}
              // radioId="cnn"
            />
            <RadioButton
              label="Fox News"
              value={selection === "fox-news"}
              onChange={handleFoxChange}
              // onClick={handleClick}
              // radioId="fox-news"
            />
            <RadioButton
              label="Reuters"
              value={selection === "reuters"}
              onChange={handleReutersChange}
              // onClick={handleClick}
              // radioId="reuters"
            />
            <br />
            <button type="submit" onClick={handleSubmit}>
              Submit
            </button>
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
