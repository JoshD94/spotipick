import React from "react";
import { useState } from "react";
import SearchElement from "./SearchElement";

function Searchbar({ sendData }) {
  var input = "";
  const [results, setResult] = useState([]);
  const [selected_songs, setSelectedSongs] = useState([]);
  const [selected_songs_names, setSelectedSongsNames] = useState([]);
  const [selected_artists, setSelectedArtists] = useState([]);
  const [selected_artists_names, setSelectedArtistsNames] = useState([]);
  async function fetch_data() {
    if (input !== "") {
      try {
        await fetch("34.145.157.101/api/spotipy/search/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            search_query: input,
            search_type: document.getElementById("song-artist-dropdown").value,
          }),
        })
          .then((response) => response.json())
          .then((data) => setResult(data));
      } catch (error) {
        console.error("Error:", error);
        setResult([]);
      }
    } else {
      setResult([]);
    }
  }

  const runSearch = () => {
    input = document.getElementById("input-text").value;
    if (selected_songs.length + selected_artists.length < 5) {
      fetch_data();
    } else {
      alert("You can only select up to 5 songs or artists");
    }
  };

  function addSong(item) {
    var temp = [...selected_songs];
    temp.push(item["id"]);
    var temp2 = [...selected_songs_names];
    temp2.push(item["name"]);
    sendData([temp, selected_artists, temp2, selected_artists_names]);
    setSelectedSongs(temp);
    setSelectedSongsNames(temp2);
  }

  function addArtist(item) {
    var temp = [...selected_artists];
    temp.push(item["id"]);
    var temp2 = [...selected_artists_names];
    temp2.push(item["name"]);
    sendData([selected_songs, temp, selected_songs_names, temp2]);
    setSelectedArtists(temp);
    setSelectedArtistsNames(temp2);
  }

  function handleClick(item) {
    document.getElementById("song-artist-dropdown").value === "artist"
      ? addArtist(item)
      : addSong(item);
    document.getElementById("input-text").value = "";
    setResult([]);
  }

  return (
    <div>
      <div className="search-div">
        <select className="song-artist-dropdown" id="song-artist-dropdown">
          <option value="song">Song</option>
          <option value="artist">Artist</option>
        </select>
        <input
          type="text"
          className="search-bar"
          placeholder="Search..."
          id="input-text"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              runSearch();
            }
          }}
        />
        <button onClick={() => runSearch()} className="search-button">
          Find
        </button>
      </div>
      {results.length > 0 ? (
        <div className="search-results">
          {Object.values(results).map((item) => (
            // TODO: remove item from the list
            // TODO: add check box to exclude artist
            <SearchElement
              key={item["id"]}
              item={item}
              type={document.getElementById("song-artist-dropdown").value}
              onClick={() => handleClick(item)}
            />
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Searchbar;
