import React from 'react'
import Card from "./Card"

function SearchResults(props) {
  const { match, location, data, category } = props;

  const songs = data.filter(result => result.type === "song"); // ==> [{ type: "artist", id: "" ....}]
  const playlists = data.filter(result => result.type.indexOf("playlist") != -1); // ==> [{ type: "playlist", id: "" ....}]
  const albums = data.filter(result => result.type === "album");
  const artists = data.filter(result => result.type === "artist")

  /**
   * Playlist har en egenskap som heter thumbnails som håller i bilderna för spellistorna.
   * Beroende på om thumbnails.url är en lista eller ett objekt så hanterar vi detta på olika sätt.
   */
  function playListArrayOrObject(playlist){
    if(typeof(playlist.thumbnails.url) === "string") return playlist.thumbnails.url

    return playlist.thumbnails[0].url
  }

  return (
    <div className="searchResult">
      { artists.length > 0 && <>
        <h2>Artists</h2>
        <div className="searchResult-results">
          {artists.map(artist => <Card key={artist.browseId} imgUrl={playListArrayOrObject(artist)} title={artist.name} subtitle="" id={artist.browseId} url={"/artist/" + artist.browseId} />)}
        </div>
      </>}

    { albums.length > 0 && <>
        <h2>Albums</h2>
          <div className="searchResult-results">
            {albums.map(album => <Card key={album.browseId} imgUrl={playListArrayOrObject(album)} title={album.name} subtitle="" id={album.browseId} url={"/album/" + album.browseId} year={album.year} />)}
          </div>
        </>}
    
    { songs.length > 0 && <> 
        <h2>Songs</h2>
        <div className="searchResult-results">                                                                                                                                                                                      
           {songs.map(song => <Card key={song.videoId} imgUrl={playListArrayOrObject(song)} title={song.name} subtitle="" id={song.videoId} url={"/sound/" + song.videoId} />)}
        </div>
    </>}

    { playlists.length > 0 && <> 
        <h2>Playlists</h2>
        <div className="searchResult-results">                                                                                            
            {playlists.map(playlist => <Card key={playlist.browseId} imgUrl={playListArrayOrObject(playlist)} title={playlist.title} subtitle={`Author: ${playlist.author}`} id={playlist.browseId} url={"/sound/" + playlist.browseId} type={playlist.type} />)}
        </div>
        </>}
    </div>
  )
}

export default SearchResults
