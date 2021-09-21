import React, { useState, useEffect } from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

// importerar komponenter och pages
import Album from './pages/Album';
import Artist from './pages/Artist';
import Sound from './pages/Sound'; 
import SearchResults from './components/SearchResults'

function App() {
  // sparar värdet från input
  const [inputText, setInputText] = useState(null)
  const [category, setCategory] = useState(); // "All", "Album", "Artist", "SoundTrack"
  const categories = ["All", "Album", "Artist", "SoundTrack", "Playlist"]

  let textInput = React.createRef();

  // sparar feach datan som används till props
  const [searchPhrase, setSearchPhrase] = useState([])

  // sparar värder av input
  function searchFunction() {
    const value = textInput.current.value;
    setInputText(value)
  }

  // kollar min nuvarande path byter url baserat på det.
  const checkAPI = () =>{
    if (category === "All" || category === "Album") return "https://yt-music-api.herokuapp.com/api/yt/search/"
    if (category === "Artist") return "https://yt-music-api.herokuapp.com/api/yt/artists/"
    if (category === "SoundTrack") return "https://yt-music-api.herokuapp.com/api/yt/songs/"
    if (category === "Playlist") return "https://yt-music-api.herokuapp.com/api/yt/playlists/"
  }

  // we will use async/await to fetch this data
  async function fetchSearch() {
    const herokuappAPI = checkAPI()
    if (inputText === null) setCategory("Make a search before filtering it!")
    if (inputText !== null) {
      let result = await fetch(herokuappAPI + inputText)
      const data = await result.json();
      const { content } = data

      //Ifall vi väljer album så använder den samma endpoint som "all" såfall ska jag bara lista ut album från listan.
      if (category === "Album") {
        const albums = content.filter(item => item.type === "album")
        setSearchPhrase(albums)
        return;
      }

      console.log(content)
      setSearchPhrase(content);
    }
  }
  
  // lyssnar på när category ändras.
  useEffect(() => {
    fetchSearch()
  },[category])

  return (
    <Router>
      <div className="topNav">
        <div className="title">
          <Link to="/"><h1>The <br></br><span>Music</span><br></br> Player</h1></Link>
        </div>
      </div>

      <div>
        <div className="search">
          <input type="text" ref={textInput} placeholder="Search for music/artists or albums" onChange={searchFunction}></input>
          {/* <button onClick={fetchSearch}>Search</button> */}
        </div>
        {categories.map(category => (
            <button className="FilterButton" onClick={() => setCategory(category)} key={category}>{category}</button>
        ))}  
        {category}
      </div>

      <Switch>
        <Route exact path="/" render={(routeProps) => <SearchResults {...routeProps} data={searchPhrase} category={category}/>} />
        <Route path="/artist/:id" component={Artist}/>
        <Route path="/album/:id" component={Album}/>
        <Route path="/sound/:id" component={Sound}/>       
      </Switch>
    </Router>
  )
}

export default App
