import React, { FC, useEffect, useState } from 'react'
import { InputBase,Paper, Chip,makeStyles, Box } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import SendIcon from '@material-ui/icons/Send'

import Head from '../Head/index'
import { useHistory, useParams } from 'react-router-dom'
import { ArrayKeyOf, useGlobalState } from '../../context'
import { GLOBAL_MESSAGES_KEY } from '../../layout/Container'
import { SMS } from '../../layout/Phone'

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
export interface MessagingProps {
  
}
const Detail: FC<MessagingProps> = () => {
  const classes = useStyles()
  const params: any = useParams()
  const history = useHistory()
  const [messages] = useGlobalState<ArrayKeyOf<SMS>[]>(GLOBAL_MESSAGES_KEY, [])

  const m = messages[params["from"]]
  useEffect(() => {

    if(!m) history.push(`/messaging`)
  }, [])
  return (
      <>
        {
          m && (
            <>
            <Head title={`SMS ${m.key}`} />
            <Box
              style={{
                marginTop: 6, padding: 10, height: 385, overflowX: 'auto', background: '#fff',
                textAlign: 'left'
                }}
            >
              {
                m.data.map((sms, index) => (
                  <Box key={`${index}-key`} style={{ position: 'relative', padding: 5}}>
                    <Chip style={{ padding: 10, right: 0 }} label={sms.message}/>
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
        
      </>
    )
}

export default Detail