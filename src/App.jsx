import React, { useState } from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

import Music from './components/Music'
import Watch from './pages/Watch'
import Albums from './pages/Albums'
import Album from './pages/Album'

function App() {
  const [inputText, setInputText] = useState()
  let textInput = React.createRef();

  const [songName, setSongName] = useState([])

  function searchFunction() {
    const value = textInput.current.value;
    setInputText(value)
  }

  // we will use async/await to fetch this data
  async function fetchSearch() {
    if (inputText != null) {
      let result = await fetch("https://yt-music-api.herokuapp.com/api/yt/search/" + inputText)
      const data = await result.json();
      const { content } = data

      // store the data into our books variable
      console.log(content)
      setSongName(content);
    }
  }

  return (
    <Router>
      <div className="topNav">
        <div className="title">
          <h1>The <br></br><span>Music</span><br></br> Player</h1>
        </div>

        <nav>
          <Link to="/watch">Watch</Link>
          <Link to="/"></Link>
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
          <Music data={songName} />
        </Route>
        <Route path="/albums">
         <Albums data={songName} />
        </Route>
        <Route path="/album/:id">
          <Album /> 
        </Route>

        <Route path="/watch/:id" component={Watch} />
      </Switch>
    </Router>
  )
}

export default App
