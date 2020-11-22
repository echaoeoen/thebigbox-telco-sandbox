import React, { FC, useEffect, useState } from 'react'
import { InputBase,Paper, Chip,makeStyles, Box } from '@material-ui/core'

import IconButton from '@material-ui/core/IconButton'
import SendIcon from '@material-ui/icons/Send'

import Head from '../Head/index'
import { useSocket } from '../../services/socket'

const useStyles = makeStyles({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: 8,
    flex: 1,
    width: 325
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
})

export interface SMS{
  msisdn: string
  content: string
  sender: string
}

export interface MessagingProps {
  
}
const Messaging: FC<MessagingProps> = () => {
  const classes = useStyles()
  const [messages, setMessages] = useState<SMS[]>([])
  const socket = useSocket()

  useEffect(() => {
    socket.on(`message`, (sms: SMS) =>{
      setMessages([...messages, sms])
    })
  }, [])
  return (
      <>
        <Head title="Messaging" />
          <Box
            style={{
              marginTop: 6, padding: 10, height: 385, overflowX: 'auto'
              }}
          >
            {
              messages.map((sms, index) => (
                <Box key={`${index}-key`} style={{ position: 'relative' }}>
                  <small>
                    {sms.sender}
                  </small>
                  <Chip style={{ padding: 10, right: 0, position: 'relative' }} label={sms.content}/>
                </Box>
                ))
            }
          </Box>
          <Paper style={{
              padding: 10,
              flex: 1,
              textAlign: 'left',
              flexDirection: 'row'
            }}
          >
            <InputBase
              className={classes.input}
              placeholder="Text Message"
              inputProps={{ 'aria-label': 'search google maps' }}
            />
            <IconButton color="primary" className={classes.iconButton} aria-label="send">
              <SendIcon />
            </IconButton>
          </Paper>
      </>
    )
}

export default Messaging