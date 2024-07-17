import React from "react";
import "./game-components.css";

// The congrats card is displayed when the user answers correctly.

const CongratsCard = ({ article }) => {
  return (
    <div className="card-container">
      <div className="congrats-card">
        <div className="congrats-card-body">
          <h5 className="congrats-card-title text-green">Congratulations!</h5>
          <p className="congrats-card-text">You answered correctly!</p>
          <img
            src={article.urlToImage}
            alt=""
            component="img"
            height="250"
            width="auto"
          />
          <h5 className="article-title">{article.title}</h5>
          <p className="article-text">{article.description}</p>
          <p className="article-text">
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
    </div>
  );
};

export default CongratsCard;
