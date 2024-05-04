import React from "react";

// The congrats card is displayed when the user answers correctly.

const CongratsCard = ({ article }) => {
  return (
    <div>
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
          <h5>{article.title}</h5>
          <p>{article.description}</p>
          <p>
            {article.content}...{" "}
            <a href={article.url} target="_blank" rel="noreferrer">
              view full article.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CongratsCard;
