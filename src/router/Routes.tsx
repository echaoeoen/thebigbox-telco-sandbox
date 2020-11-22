import React, { FC } from 'react'
import {
  BrowserRouter, Switch, Redirect
} from 'react-router-dom'
import Container from '../layout/Container'
import HomeScreen from '../views/HomeScreen'
import MessagingScreen from '../views/MessageScreen'
import EmailScreen from '../views/EmailScreen'
import RouteWithLayout from './RouteWithLayout'


const Routes: FC<{}> = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect
          exact
          from="/"
          to="/home"
        />
        <RouteWithLayout
          component={HomeScreen}
          layout={Container}
          path="/home"
        />
        <RouteWithLayout
          component={EmailScreen}
          layout={Container}
          path="/email"
        />
        <RouteWithLayout
          component={MessagingScreen}
          layout={Container}
          path="/messaging"
        />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes