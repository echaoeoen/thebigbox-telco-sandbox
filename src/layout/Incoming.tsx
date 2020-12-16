import { Box, Fab, Grid, Paper, Typography } from '@material-ui/core'
import React, { FC, useEffect, useState } from 'react'

import BatteryIcon from '@material-ui/icons/Battery30'
import SignalIcon from '@material-ui/icons/SignalCellular3Bar'

import RejectIcon from '@material-ui/icons/PhoneDisabled'
import PhoneIcon from '@material-ui/icons/Phone'

import { Voice } from './Phone'
import Player, { bulkAudio } from '../services/audio.player'

export interface IncomingCallProps {
  open: boolean
  voice: Voice
  done: Function
} 
export enum STATS {
  STANDBY='standby',
  RINGING='ringing',
  HANGUP='hangup' 
}
const AUDIOASSETPATH = `/assets/voice-audio`
const ringtonePlayer = Player(`${AUDIOASSETPATH}/ringtone.wav`)
let timeout: NodeJS.Timeout
let voicePlayer = bulkAudio([])
const IncomingCall: FC<IncomingCallProps> = ({
  open, voice, done
}) => {
  const [stats, setStats] = useState<STATS>(STATS.STANDBY)

  useEffect(() => {
    open && setStats(STATS.RINGING)
  }, [open])
  const ringStats = () => {
    if(stats === STATS.RINGING) {
      timeout = setTimeout(end, 10000)
      return ringtonePlayer.play()
    }
    ringtonePlayer.stop()
  }
  useEffect(() => {
    ringStats()
  }, [stats])

  const end = () => {
    setStats(STATS.STANDBY)
    voicePlayer.stop()
    done()
  }
  const up = async () => {
    const voices = []
    clearTimeout(timeout)
    setStats(STATS.HANGUP)
    if (voice.content.length > 0) voices.push(`${AUDIOASSETPATH}/opening.wav`)
    for (let i = 0; i < voice.content.length; i++) {
      const element = voice.content[i];
      voices.push(`${AUDIOASSETPATH}/${element}.wav`)
    }
    voicePlayer = bulkAudio(voices)
    await voicePlayer.play()
    await voicePlayer.play()
    end()
  }
  return  (
    <>
    {open && 
      <React.Fragment>
      <Paper style={{ 
        width: 400, 
        height: 600, 
        position: 'relative', 
        background: '#000'
      }
        }>
        <Box style={{
          background: "#afafaf",
          textAlign: 'right'
        }}>
          <SignalIcon fontSize='small' style={{color: '#fff'}} />
          <BatteryIcon fontSize='small' style={{color: '#fff'}} />
        </Box>
        <div style={{
          height: 540
        }}>
          <Box style={{ textAlign: 'center', color:'#fff',height: '50%', padding: 20 }}>
            <Typography variant={'h3'}>
              {voice.caller || 'TELKOM'}
            </Typography>
            <Typography>
                { stats === STATS.RINGING && `Calling ...` }

            </Typography>
          </Box>
          <Grid container>
            <Grid item xs={6}>
              <Fab onClick={end} style={{color: '#fff', background: '#FF0000'}}  aria-label="like">
                <RejectIcon />
              </Fab>
            </Grid>
            <Grid item xs={6}>
              <Fab onClick={up} style={{color: '#fff', background: '#00FF00'}} aria-label="like">
                <PhoneIcon />
              </Fab>
            </Grid>
          </Grid>
        </div>
        </Paper>
      </React.Fragment>
    }
    </>
    )
}

export default IncomingCall