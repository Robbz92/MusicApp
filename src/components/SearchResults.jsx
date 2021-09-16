import React from 'react'
import Card from "./Card"

function SearchResults(props) {
  const { match, location, data, category } = props;

  const songs = data.filter(result => result.type === "song"); // ==> [{ type: "artist", id: "" ....}]
  const playlists = data.filter(result => result.type.indexOf("playlist") != -1); // ==> [{ type: "playlist", id: "" ....}]
  const albums = data.filter(result => result.type === "album");
  const artists = data.filter(result => result.type === "artist")

  // if (location.pathname == "/artist") return (
  //   <div>
  //     <h2>Artists</h2>
  //     <div>
  //       {artists.map(artist => <Card imgUrl={artist.thumbnails[0].url} title={artist.name} subtitle="" id={artist.browseId} url={"/artist/" + artist.browseId} />)}
  //     </div>
  //   </div>
  // )

  // if (location.pathname == "/album") return (
  //   <div>
  //     <h2>Albums</h2>
  //     <div>
  //       {albums.map(album => <Card imgUrl={album.thumbnails[0].url} title={album.name} subtitle="" id={album.browseId} url={"/album/" + album.browseId} year={album.year} />)}
  //     </div>
  //   </div>
  // )

  // if (location.pathname == "/songs") return (
  //   <div>
  //     <h2>Songs</h2>
  //     <div>
  //       {songs.map(song => <Card imgUrl={song.thumbnails[0].url} title={song.name} subtitle="" id={song.videoId} url={"/sound/" + song.videoId} />)}
  //     </div>
  //   </div>
  // )

  // if (location.pathname == "/playlists") return (
  //   <div>
  //     <h2>Playlists</h2>
  //     <div>
  //       {playlists.map(playlist => <Card imgUrl={playlist.thumbnails[0].url} title={playlist.name} subtitle="" id={playlist.videoId} url={"/playlist/" + playlist.videoId} />)}
  //     </div>
  //   </div>
  // )

  return (
    <div className="searchResult">
      { artists.length > 0 && <>
        <h2>Artists</h2>
        <div className="searchResult-results">
          {artists.map(artist => <Card key={artist.browseId} imgUrl={artist.thumbnails[0].url} title={artist.name} subtitle="" id={artist.browseId} url={"/artist/" + artist.browseId} />)}
        </div>
      </>}

    { albums.length > 0 && <>
        <h2>Albums</h2>
          <div className="searchResult-results">
            {albums.map(album => <Card key={album.browseId} imgUrl={album.thumbnails[0].url} title={album.name} subtitle="" id={album.browseId} url={"/album/" + album.browseId} year={album.year} />)}
          </div>
        </>}
    
    { songs.length > 0 && <> 
        <h2>Songs</h2>
        <div className="searchResult-results">                                                                                                                                                                                      
           {songs.map(song => <Card key={song.videoId} imgUrl={song.thumbnails[0].url} title={song.name} subtitle="" id={song.videoId} url={"/sound/" + song.videoId} />)}
        </div>
    </>}

    { playlists.length > 0 && <> 
        <h2>Playlists</h2>
        <div className="searchResult-results">                                                                                            
            {playlists.map(playlist => <Card key={playlist.browseId} imgUrl={""} title={playlist.title} subtitle={`Author: ${playlist.author}`} id={playlist.browseId} url={"/sound/" + playlist.browseId} type={playlist.type} />)}
        </div>
        </>}
    </div>
  )
}

export default SearchResults
