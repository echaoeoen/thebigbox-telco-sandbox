import React, { FC, ReactElement } from 'react'
import {Paper, Box, Button} from '@material-ui/core'
import { useHistory } from  'react-router-dom'
import BatteryIcon from '@material-ui/icons/Battery30'
import SignalIcon from '@material-ui/icons/SignalCellular3Bar'
import BackIcon from '@material-ui/icons/ArrowBack'
import HomeIcon from '@material-ui/icons/Home'
import OptionIcon from '@material-ui/icons/List'
export interface PhoneProps {
  children: ReactElement
}

export interface SMS{
  msisdn: string
  content: string
  sender: string
}

const Phone: FC<PhoneProps> = ({children}) => {
  const history = useHistory()
  const _back = () => {
    if(history.location.pathname !== '/home') history.goBack()
  }
  return (
  <React.Fragment>
    <Paper style={{ 
      width: 400, 
      height: 600, 
      position: 'relative', 
      background: 'url("/assets/bg.jpg") no-repeat center center fixed'}}>
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
        {children}   
      </div>
      <Box style={{
        background: "#555",
        position: 'absolute',
        width: 400
      }}>
        <Button onClick={_back}>
          <BackIcon style={{color: '#fff'}}/>
        </Button>
        <Button>
          <HomeIcon style={{color: '#fff'}}/>
        </Button>
        <Button>
          <OptionIcon style={{color: '#fff'}}/>
        </Button>
      </Box>     
      </Paper>
    </React.Fragment>)
}

export default Phone