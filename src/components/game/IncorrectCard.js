import React from "react";
import "./game-components.css";

const IncorrectCard = ({ article, source }) => {
  // TODO: fix the incorrect card to display the proper name of the source.

  return (
    <div className="card-container">
      <p>
        Sorry, your guess was incorrect. This headline was written by {source}.
      </p>
      <div className="incorrect-card-article">
        <img
          src={article.urlToImage}
          alt=""
          component="img"
          height="250"
          width="auto"
        />
        <h5>{article.title}</h5>
        <p>{article.description}</p>
        <p>
          {article.content}...{" "}
          <a
            href={article.url}
            className="article-link"
            target="_blank"
            rel="noreferrer"
          >
            view full article.
          </a>
        </p>
      </div>
    </div>
  );
};

export default IncorrectCard;
