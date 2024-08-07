import React from "react";
import { useState } from "react";
import Song from "./Song";

function Result(props) {
  const [songs, setSongs] = useState([]);
  const [generating, setGenerating] = useState(false);
  let song_ids = [];

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      artists: props.artists,
      songs: props.songs,
      song: props.song,
      excluded_artists: [],
      rec_num: 50,
    }),
  };

  async function generate() {
    setSongs([]);
    setGenerating(true);
    if (audio != null) {
      Result.audio.pause();
      Result.audio = null;
    }
    try {
      await fetch(
        "http://34.145.157.101/api/spotipy/recommendations/",
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          setSongs(data.songs);
        });
    } catch (error) {
      console.error("Error:", error);
    }
    setGenerating(false);
  }

  let audio = null;
  let next_song_null = true;
  let next_song = songs[0];
  const [active_song, setActiveSong] = useState(null);
  let song_id = "";
  const autoplay_preview_duration = 10;
  //TODO: make duration editable by user

  function play() {
    Result.audio.play();
    Result.interval = setInterval(() => {
      next_song = songs[song_ids.indexOf(song_id) + 1];
      next_song_null = next_song["Preview URL"] === null;
      while (next_song_null) {
        next_song = songs[song_ids.indexOf(next_song["Track ID"]) + 1];
        next_song_null = next_song["Preview URL"] === null;
      }
      clearInterval(Result.interval);
      play_audio(next_song["Preview URL"], next_song["Track ID"]);
    }, autoplay_preview_duration * 1000);
  }

  function play_audio(a, s) {
    song_ids = [];
    for (let i = 0; i < songs.length; i++) {
      song_ids.push(songs[i]["Track ID"]);
    }
    // If different song clicked or first time clicked
    clearInterval(Result.interval);
    if (s !== active_song) {
      // different song clicked or new song autoplayed
      setActiveSong(s);
      song_id = s;
      if (Result.audio) {
        Result.audio.pause();
      }
      Result.audio = new Audio(a);
      play();
    } else {
      // song is playing
      Result.audio.pause();
      setActiveSong(null);
      song_id = "";
    }
    document.getElementById(s).scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
  }

  return (
    <div className="results-div">
      <button onClick={generate} className="generate-button">
        generate
      </button>
      {active_song}
      {generating ? (
        <img
          src="https://i.gifer.com/ZKZg.gif"
          className="generating-spinner"
          alt="generating..."
        />
      ) : (
        <div>
          {songs.map((s) => (
            <Song
              song={s}
              key={s["Track ID"]}
              play_audio={play_audio}
              active_song={active_song}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Result;
