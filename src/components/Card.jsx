import React from "react";

const Card = ({ catData, onBan }) => {
  const renderAttributeButton = (label) => (
    <button className={label} onClick={() => onBan(label)}>
      {label}
    </button>
  );

  return (
    <div className="card-data">
      {catData && catData.breeds && (
        <>
          {catData.breeds.length > 0 ? (
            <>
              <h2 className="card-title">{catData.breeds[0].id}</h2>
              <div className="attributes">
                {renderAttributeButton(catData.breeds[0].name)}
                {renderAttributeButton(
                  catData.breeds[0].weight
                    ? `${catData.breeds[0].weight.imperial} lbs`
                    : "Unknown"
                )}
                {renderAttributeButton(catData.breeds[0].origin)}
                {renderAttributeButton(`${catData.breeds[0].life_span} years`)}
              </div>
            </>
          ) : (
            <p>No breed information available</p>
          )}
          <img className="card-image" src={catData.url} alt="A cat image" />
        </>
      )}
    </div>
  );
};

export default Card;
