import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadArticle } from "../../actions/articleAction";

export const GameCard = () => {
  const dispatch = useDispatch();
  const articles = useSelector(
    (state) => state.article[Math.floor(Math.random() * state.article.length)]
  );
  const [value, setValue] = useState(false);

  useEffect(() => {
    dispatch(loadArticle());
  }, [dispatch]);
  console.log("articles", articles);

  const handleChange = () => {
    setValue(!value);
  };

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
              value={value}
              onChange={handleChange}
            />
            <RadioButton
              label="BBC News"
              value={value}
              onChange={handleChange}
            />
            <RadioButton
              label="CNN News"
              value={value}
              onChange={handleChange}
            />
            <RadioButton
              label="Fox News"
              value={value}
              onChange={handleChange}
            />
            <RadioButton
              label="Reuters"
              value={value}
              onChange={handleChange}
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
