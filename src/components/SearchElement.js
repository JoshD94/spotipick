import React from "react";

function SearchElement(props) {
  if (props.type == "artist") {
    return (
      <div onClick={(e) => props.onClick()}>
        <div key={props.item["id"]} className="search-element-div">
          <p className="search-element-text">{props.item["name"]}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div onClick={(e) => props.onClick()}>
        <div key={props.item["id"]} className="search-element-div">
          <p className="search-element-text">{props.item["name"]}</p>
          <p className="search-element-artist">
            {props.item["artists"][0]["name"]}
          </p>
        </div>
      </div>
    );
  }
}

export default SearchElement;
