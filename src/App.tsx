import React from 'react'
import './App.css'
import Routes from './router/Routes'
import { createBrowserHistory } from 'history'
import { Router } from 'react-router-dom'
const browserHistory = createBrowserHistory()

function App() {
  return (

    <div className="App">
      <Router history={browserHistory}>
        <Routes/>
      </Router>
    </div>
  )
}

export default App
