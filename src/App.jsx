import React, { useState } from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

// importerade komponenter
import Music from './components/Music'
import Watch from './pages/Watch'
import Artist from './pages/Artist'
import Album from './pages/Album'

function App() {
  // sparar värdet från input
  const [inputText, setInputText] = useState()
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
    const currentPath = window.location.pathname;
    console.log(currentPath)
    if (currentPath == "/") return "https://yt-music-api.herokuapp.com/api/yt/search/"
    if (currentPath == "/album") return "https://yt-music-api.herokuapp.com/api/yt/albums/"
    if (currentPath == "/artist") return "https://yt-music-api.herokuapp.com/api/yt/artists/"
    if (currentPath == "/watch") return "https://yt-music-api.herokuapp.com/api/yt/songs/"
  }

  // we will use async/await to fetch this data
  async function fetchSearch() {
    const herokuappAPI = checkAPI()
    if (inputText != null) {
      let result = await fetch(herokuappAPI + inputText)
      const data = await result.json();
      const { content } = data

      // store the data into our books variable
      console.log(content)
      setSearchPhrase(content);
      
      textInput.current.value = ''
    }
  }

  return (
    <Router>
      <div className="topNav">
        <div className="title">
          <h1>The <br></br><span>Music</span><br></br> Player</h1>
        </div>

        <nav>
          <Link to="/">Home</Link>
          <Link to="/artist">Artist</Link>
          <Link to="/album"> Album</Link>
          <Link to="/watch">Watch</Link>
        </nav>
      </div>

      <div>
        <div className="search">
          <input type="text" ref={textInput} placeholder="Search for music/artists or albums" onChange={searchFunction}></input>
          <button onClick={fetchSearch}>Search</button>
        </div>
      </div>

      <Switch>
        <Route exact path="/">
          <Music data={searchPhrase} />
        </Route>
        <Route path="/album">
          <Album data={searchPhrase}/> 
        </Route>
        <Route path="/artist">
          <Artist data={searchPhrase}/> 
        </Route>
        <Route path="/watch">
          <Watch data={searchPhrase}/>
        </Route>
        {/* <Route path="/watch/:id" component={Watch} /> */}

      </Switch>
    </Router>
  )
}

export default App
