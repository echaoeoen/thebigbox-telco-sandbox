import React from 'react'
import './App.css'
import Routes from './router/Routes'
import { createBrowserHistory } from 'history'
import { Router } from 'react-router-dom'
import { GlobalStateProvider } from './context'
const browserHistory = createBrowserHistory()

function App() {
  return (
    <GlobalStateProvider>
      <div className="App">
        <Router history={browserHistory}>
          <Routes/>
        </Router>
      </div>
    </GlobalStateProvider>
  )
}

export default App
