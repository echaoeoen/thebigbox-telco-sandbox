import React, { FC } from 'react'
import { makeStyles, Box } from '@material-ui/core'
import {useHistory} from 'react-router'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import { ArrayKeyOf, useGlobalState } from '../../context'
import { SMS } from '../../layout/Phone'
import { GLOBAL_MESSAGES_KEY } from '../../layout/Container'
import Head from '../Head'
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
  inline: {
    display: 'inline',
  },
})

export const SAMPLE_MESSAGE: ArrayKeyOf<SMS>[] = [
  {
    key: "Telkom",
    data: [{
      message: 'Test',
      from: 'Telkom'
    }]
  },
  {
    key: "Telkom",
    data: [{
      message: 'Test',
      from: 'Telkom'
    }]
  },
  {
    key: "Telkom",
    data: [{
      message: 'Test',
      from: 'Telkom'
    }]
  },
  {
    key: "Telkom",
    data: [{
      message: 'Test',
      from: 'Telkom'
    }]
  },
  {
    key: "Telkom",
    data: [{
      message: 'Test',
      from: 'Telkom'
    }]
  },
  {
    key: "Telkom",
    data: [{
      message: 'Test',
      from: 'Telkom'
    }]
  },
  {
    key: "Telkom",
    data: [{
      message: 'Test',
      from: 'Telkom'
    }]
  },
  {
    key: "Telkom",
    data: [{
      message: 'Test',
      from: 'Telkom'
    }]
  }
] 
export interface MessagingProps {
  
}
const MessageList: FC<MessagingProps> = () => {
  const classes = useStyles()
  const [messages] = useGlobalState<ArrayKeyOf<SMS>[]>(GLOBAL_MESSAGES_KEY, [])
  const history = useHistory()
  
  const goDetail = (pos: number) => {
    history.push(`/message-detail/${pos}`)
  }
  return (
      <>
        <Head title="Messaging" />
          <Box
            style={{
              marginTop: 6, padding: 10, height: 450, overflowX: 'auto',background: '#fff'
              }}
          >
            <List>
            {
              messages.map((k, i) => (
                <>
                <ListItem key={`m-${i}`} alignItems="flex-start" onClick={() => goDetail(i)}>
                  <ListItemAvatar>
                    <Avatar alt={k.key} src="/static/images/avatar/1.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={k.key}
                    secondary={
                      <React.Fragment>
                        {k.data[k.data.length - 1].message}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                </>
              ))
            }
            </List>
          </Box>
      </>
    )
}

export default MessageList