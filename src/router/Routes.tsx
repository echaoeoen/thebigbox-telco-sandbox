import React, { FC } from 'react'
import {
  BrowserRouter, Switch, Redirect
} from 'react-router-dom'
import Container from '../layout/Container'
import HomeScreen from '../views/HomeScreen'
import MessagingScreen from '../views/MessageScreen'
import MessagingDetailScreen from '../views/MessageDetailScreen'
import EmailScreen from '../views/EmailScreen'
import RouteWithLayout from './RouteWithLayout'
import EmailDetailScreen from '../views/EmailDetailScreen'


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
          component={EmailDetailScreen}
          layout={Container}
          path="/email-detail/:pos"
        />
        <RouteWithLayout
          component={MessagingScreen}
          layout={Container}
          path="/messaging"
        />
        <RouteWithLayout
          component={MessagingDetailScreen}
          layout={Container}
          path="/message-detail/:from"
        />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes