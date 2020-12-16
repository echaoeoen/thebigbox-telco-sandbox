import React, { ChangeEvent, FC, ReactElement, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Head from '../components/Head/index'
// eslint-disable-next-line import/first
import { Button } from '@material-ui/core'
import Phone, { SMS, Voice } from './Phone'
import { useSocket } from '../services/socket'
import IncomingCall from './Incoming'
import { ArrayKeyOf, useGlobalState } from '../context'
import Player from '../services/audio.player'

const smsPlayer = Player(`/assets/voice-audio/sms.mp3`, false)
const emailPlayer = Player(`/assets/voice-audio/email.mp3`, false)
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 600,
    width: 400,
  },
  control: {
    padding: theme.spacing(2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
}))
function random(length: number) {
  let result = ''
  const characters = '0123456789'
  const charactersLength = characters.length
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

export interface Email {
  subject: string
  message: string
  recipient: string
}

export const GLOBAL_MESSAGES_KEY = 'message'
export const GLOBAL_EMAIL_KEY = 'email'
export interface ContainerProps {
  children: ReactElement
}
var MESSAGES: ArrayKeyOf<SMS>[] = []
var EMAILS: Email[] = []
const Container: FC<ContainerProps> = ({children}) => {
  // eslint-disable-next-line no-unused-vars
  const classes = useStyles()
  const socket = useSocket()
  const [globalMessages, setGlobalMessages] = useGlobalState<ArrayKeyOf<SMS>[]>(GLOBAL_MESSAGES_KEY, [])
  const [messages, setMessages] = useState<ArrayKeyOf<SMS>[]>([])
  const [emails, setEmails] = useGlobalState<Email[]>(GLOBAL_EMAIL_KEY, [])
  const [openIncoming, setOpenIncoming] = useState(false)
  const [voice, setVoice] = useState<Voice>({
    caller: 'TELKOM',
    content: '123456789'
  })
  const [values, setValues] = React.useState({
    phoneNumber: '',
    email: ''
  })
  const handleChange = (name: string) => (event: ChangeEvent) => {
    const value = (event.target as any).value
    setValues({ ...values, [name]: value })
  }
  useEffect(() => {
    if(messages.length === 0) {
      setMessages(MESSAGES)
      setGlobalMessages(MESSAGES)
    }
  }, [messages])
  const setMSG = (m: ArrayKeyOf<SMS>[]) => {
    MESSAGES = m
    setGlobalMessages([])
    setMessages([])
  }
  const setEMAILS = (m: Email[]) => {
    EMAILS = m
    setEmails(EMAILS)
  }

  function generateRandomNumber() {
    socket.emit('leave', values.phoneNumber)
    const randomNumber = random(10)
    const phoneNumber = `08${randomNumber}`    
    socket.join(phoneNumber)
  
    socket.on('message', ({ message: sms }: {message: SMS}) => {
      smsPlayer.play()
      let messages = MESSAGES
      for (const k in messages) { 
        const element = messages[k]
        if(sms.from === element.key) {
          messages[k].data.push(sms)
          return setMSG(messages)
        }
      }
      setMSG([
        {
          key: sms.from,
          data: [sms]
        },
        ...messages
      ])
    })
    socket.on('voice', (voice: Voice) => {
      setOpenIncoming(true)
      setVoice(voice)
    })
    setValues({ ...values, phoneNumber })
  }
  function generateRandomEmail(){
    socket.emit('leave', values.email)

    const randomEmail = random(5)
    const email = `${randomEmail}@mailtest.com`
    socket.join(email)
    setValues({...values, email })
    socket.on('email', (email: Email) => {
      emailPlayer.play()
      setEMAILS([email, ...EMAILS])
    })
  }

  useEffect(() => {
  }, [])
  return (
    <Grid container className={classes.root} spacing={10}>
      <Head title="SMS-Sandbox" />
      <Grid item xs={12}>
        <br />
        <Grid container justify="center" spacing={10}>
          <Grid spacing={10}>
            Configuration
            <Paper className={classes.paper} >
              <div style={{ padding: 10 }}>
                <Grid>
                  <TextField
                    id="standard-name"
                    label="Phone Number"
                    className={classes.textField}
                    value={values.phoneNumber}
                    disabled
                    onChange={handleChange('phoneNumber')}
                    margin="normal"
                    cy-data="txt-phonenumber"
                  />

                </Grid>
                <Button variant="contained" cy-data="button-generate" color="primary" onClick={generateRandomNumber}>
                    Random Number
                </Button>
                <Grid>
                  <TextField
                    id="standard-name"
                    label="Email"
                    className={classes.textField}
                    value={values.email}
                    disabled
                    onChange={handleChange('email')}
                    margin="normal"
                    cy-data="txt-email"
                  />

                </Grid>
                <Button variant="contained" cy-data="button-generate" color="primary" onClick={generateRandomEmail}>
                    Random Email
                </Button>
              </div>
            </Paper>
          </Grid>
          <Grid spacing={10} >
            Phone
            <IncomingCall
              open={openIncoming}
              done={() => setOpenIncoming(false)}
              voice={voice}
            />
            {
            !openIncoming &&
            <Phone>
              {children}
            </Phone>
            }
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
export default Container