import React from "react";
import PlayButton from "./PlayButton";
import PauseButton from "./PauseButton";

function Song({ song, play_audio, active_song }) {
  //   const [playing, setPlaying] = useState(false);
  const audio = song["Preview URL"];
  function set_play() {
    play_audio(audio, song["Track ID"]);
  }
  return (
    <div className="song-div" id={song["Track ID"]}>
      <img
        src={song["Album Cover Medium"]}
        alt={song["Track Name"]}
        className="song-image"
      />
      <p
        className="song-title"
        onClick={() => window.open(song["External URLs"])}
      >
        {song["Track Name"]}
      </p>
      <p className="song-artist">{song["Artists Names"][0]}</p>

      {song["Preview URL"] == null ? (
        <div>
          <p className="song-audio-error">No preview available</p>
        </div>
      ) : active_song === song["Track ID"] ? (
        <div onClick={() => set_play()} className="play-div">
          <PauseButton />
        </div>
      ) : (
        <div onClick={() => set_play()} className="play-div">
          <PlayButton />
        </div>
      )}
    </div>
  );
}

export default Song;
