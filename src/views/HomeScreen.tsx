import React, { FC } from "react"
import {Box, Button, Link} from '@material-ui/core'
import {Link as RouterLink} from 'react-router-dom'
import MessageIcon from '@material-ui/icons/Message'
import EmailIcon from '@material-ui/icons/Mail'
const HomeScreen: FC = () => {
  return (
    <Box style={{textAlign: 'left'}}>
      <Link component={RouterLink} to ='/email'>
        <Button 
          style={{margin: 10}} 
          color='primary' 
          variant='contained'>
          <EmailIcon 
            fontSize='large'/>
          Email

        </Button>
      </Link>
      <Link component={RouterLink} to ='/messaging'>
        <Button style={{margin: 10}} color='secondary' variant='contained'>
          <MessageIcon 
            fontSize='large'/>
            Messaging
        </Button>
      </Link>
    </Box>
  )
}

export default HomeScreen