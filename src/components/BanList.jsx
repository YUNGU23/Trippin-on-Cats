import React from "react";

const BanList = ({ banList, onBan }) => {
  const renderBanItem = (attribute, idx) => (
    <button className="banlist-item" key={idx} onClick={() => onBan(attribute)}>
      {attribute}
    </button>
  );

  return (
    <div className="banlist">
      <h2 className="banlist-title">Ban List</h2>
      <p className="banlist-description">
        Select an attribute in your listing to ban it.
      </p>
      <div className="banlist-attributes">{banList.map(renderBanItem)}</div>
    </div>
  );
};

export default BanList;
