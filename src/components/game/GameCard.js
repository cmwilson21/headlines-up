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

  const changeHandler = (source) => {
    return () => {
      setSelection(source);
    };
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submitting", selection);
  };

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

  if (article) {
    return (
      <div>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{article.title}</h5>
            <p className="card-text">{article.description}</p>
            <p>{article.content}</p>
            <RadioButton
              label="AP News"
              value={selection === "ap-news"}
              onChange={changeHandler("ap-news")}
            />
            <RadioButton
              label="BBC News"
              value={selection === "bbc-news"}
              onChange={changeHandler("bbc-news")}
            />
            <RadioButton
              label="CNN News"
              value={selection === "cnn-news"}
              onChange={changeHandler("cnn-news")}
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
