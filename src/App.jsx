import React, { useState } from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

import Music from './components/Music'

function App() {
  const [inputText, setInputText] = useState()
  let textInput = React.createRef();

  function t() {
    const value = textInput.current.value;
    setInputText({ value })
  }


  return (
    <Router>
      <div className="topNav">
        <div className="title">
          <h1>The <br></br><span>Music</span><br></br> Player</h1>
        </div>

        <div className="search">
          <input type="text" ref={textInput} placeholder="Search for music/artists or albums"></input>
          <button onClick={t}>search</button>
        </div>
        <nav>
          <Link to="/"></Link>
        </nav>
      </div>
      <Switch>
        <Route path="/">
          <Music inputText={inputText} />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
