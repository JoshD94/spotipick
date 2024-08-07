import "./App.css";
import Header from "./components/Header";
import Searchbar from "./components/Searchbar";
import Result from "./components/Result";
import ItemPool from "./components/ItemPool";

import { useState } from "react";

function App() {
  const [selected_songs, setSelectedSongs] = useState([]);
  const [selected_songs_names, setSelectedSongsNames] = useState([]);
  const [selected_artists, setSelectedArtists] = useState([]);
  const [selected_artists_names, setSelectedArtistsNames] = useState([]);

  function collectItems(data) {
    setSelectedSongs(data[0]);
    setSelectedArtists(data[1]);
    setSelectedSongsNames(data[2]);
    setSelectedArtistsNames(data[3]);
  }

  return (
    <div className="app">
      <Header />
      <Searchbar sendData={collectItems} />
      <ItemPool songs={selected_songs_names} artists={selected_artists_names} />
      {selected_songs.length > 0 || selected_artists.length > 0 ? (
        <Result
          songs={selected_songs}
          artists={selected_artists}
          song={selected_songs.length > 0 ? selected_songs[0] : ""}
        />
      ) : null}
    </div>
  );
}

export default App;
