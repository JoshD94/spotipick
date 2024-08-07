import React from "react";

function ItemPool({ songs, artists }) {
  return (
    <div>
      {songs.length > 0 || artists.length > 0 ? (
        <div className="item-pool-div">
          {songs.map((item) => (
            <div key={item} className="item-pool-element">
              <p className="item-pool-text">{item}</p>
            </div>
          ))}
          {artists.map((item) => (
            <div key={item} className="item-pool-element">
              <p className="item-pool-text">{item}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default ItemPool;
