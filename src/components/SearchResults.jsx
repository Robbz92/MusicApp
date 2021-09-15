import React from 'react'
import Card from "./Card"

function SearchResults(props) {
  const { match, location, data } = props;

  const songs = data.filter(result => result.type === "song"); // ==> [{ type: "artist", id: "" ....}]
  const playlists = data.filter(result => result.type === "playlist"); // ==> [{ type: "playlist", id: "" ....}]
  //...

  if ("/songs") return (
    <div>
      <h2>Songs</h2>
      <div>
        {songs.map(song => <Card imgUrl={song.thumbnails[0].url} title={song.name} subtitle="" id={song.videoId} url={"/sound/" + song.videoId} />)}
      </div>  
    </div>
  )
  
  if ("/playlists") return (
    <div>
      <h2>Playlists</h2>
      <div>
        {playlists.map(playlist => <Card imgUrl={playlist.thumbnails[0].url} title={playlist.name} subtitle="" id={playlist.videoId} url={"/playlist/" + playlist.videoId} />)}
      </div> 
    </div>
  )

  return (
    <div>
      <h2>Songs</h2>
      <div>
        {songs.map(song => <Card imgUrl={song.thumbnails[0].url} title={song.name} subtitle="" id={song.videoId} url={"/sound/" + song.videoId} />)}
      </div>  
      <h2>Playlists</h2>
      <div>
        {playlists.map(playlist => <Card imgUrl={playlist.thumbnails[0].url} title={playlist.name} subtitle="" id={playlist.videoId} url={"/playlist/" + playlist.videoId} />)}
      </div>  
    </div>
  )
}

export default SearchResults
