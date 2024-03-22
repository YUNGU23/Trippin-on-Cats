import React from "react";

const History = ({ history }) => {
  const renderHistoryItem = (attribute, idx) => (
    <div className="history-attribute" key={idx}>
      <img className="history-image" src={attribute.url} alt="" />
      <p>
        A {attribute.breeds[0].name} cat from {attribute.breeds[0].origin}
      </p>
    </div>
  );

  return (
    <div className="history">
      <h2 className="history-title">What have we seen so far?</h2>
      <div className="history-body">{history.map(renderHistoryItem)}</div>
    </div>
  );
};

export default History;
