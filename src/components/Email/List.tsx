import React, { FC } from 'react'
import { makeStyles, Box } from '@material-ui/core'
import {useHistory} from 'react-router'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import {useGlobalState } from '../../context'
import { Email, GLOBAL_EMAIL_KEY } from '../../layout/Container'
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

export const SAMPLE_EMAIL: Email[] = [
  {
    message: '<div></div>',
    subject: 'Oka',
    recipient: 'me'
  }
] 
export interface MessagingProps {
  
}
const EmailList: FC<MessagingProps> = () => {
  const classes = useStyles()
  const [emails] = useGlobalState<Email[]>(GLOBAL_EMAIL_KEY, SAMPLE_EMAIL)
  const history = useHistory()
  
  const goDetail = (pos: number) => {
    history.push(`/email-detail/${pos}`)
  }
  return (
      <>
        <Head title="Email" />
          <Box
            style={{
              marginTop: 6, padding: 10, height: 450, overflowX: 'auto',background: '#fff'
              }}
          >
            <List>
            {
              emails.map((k, i) => (
                <>
                <ListItem key={`m-${i}`} alignItems="flex-start" onClick={() => goDetail(i)}>
                  <ListItemAvatar>
                    <Avatar alt={`The Bigbox`} src="/static/images/avatar/1.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`noreply@thebigbox.id`}
                    secondary={
                      <React.Fragment>
                        {k.subject}
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

export default EmailList