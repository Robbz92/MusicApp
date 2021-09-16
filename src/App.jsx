import React, { useState } from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

import Album from './pages/Album';
import Artist from './pages/Artist';
import Sound from './pages/Sound'; 

import SearchResults from './components/SearchResults'

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
    }
  }

  return (
    <Router>
      <div className="topNav">
        <div className="title">
          <h1>The <br></br><span>Music</span><br></br> Player</h1>
        </div>
      </div>

      <div>
        <div className="search">
          <input type="text" ref={textInput} placeholder="Search for music/artists or albums" onChange={searchFunction}></input>
          <button onClick={fetchSearch}>Search</button>
        </div>
      </div>

      <Switch>
        <Route exact path="/" render={(routeProps) => <SearchResults {...routeProps} data={searchPhrase} />} />
        <Route path="/artist/:id" component={Artist}/>
        <Route path="/album/:id" component={Album}/>
        <Route path="/sound/:id" component={Sound}/>       
      </Switch>
    </Router>
  )
}

export default App
