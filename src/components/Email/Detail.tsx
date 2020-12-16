import React, { FC, useEffect, useState } from 'react'
import { InputBase,Paper, Chip,makeStyles, Box } from '@material-ui/core'
import {SAMPLE_EMAIL} from './List'
import IconButton from '@material-ui/core/IconButton'
import SendIcon from '@material-ui/icons/Send'

import Head from '../Head/index'
import { useHistory, useParams } from 'react-router-dom'
import { ArrayKeyOf, useGlobalState } from '../../context'
import { Email, GLOBAL_EMAIL_KEY } from '../../layout/Container'
import { SMS } from '../../layout/Phone'
import { Sms } from '@material-ui/icons'

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
export interface EmailingProps {
  
}
const Detail: FC<EmailingProps> = () => {
  const classes = useStyles()
  const params: any = useParams()
  const history = useHistory()
  const [emails] = useGlobalState<Email[]>(GLOBAL_EMAIL_KEY, SAMPLE_EMAIL)

  const m = emails[params["pos"]]
  useEffect(() => {

  if(!m) history.push(`/messaging`)
  }, [])
  return (
      <>
        {
          m && (
            <>
            <Head title={`${m.subject}`} />
            <Box
              style={{
                marginTop: 6, padding: 10, height: 500, overflowX: 'auto', background: '#fff',
                textAlign: 'left'
                }}
            >
              <Box style={{ position: 'relative', padding: 5}}>
                From: {`noreply@thebigbox.id`}
              </Box>
              <Box style={{ position: 'relative', padding: 5}}>
                Subject: {m.subject}
              </Box>
              <div dangerouslySetInnerHTML={{__html: m.message}} style={{ position: 'relative', padding: 5}}/>
              
            </Box>
            </>
          )
        }
        
      </>
    )
}

export default Detail