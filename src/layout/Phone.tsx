import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import Head from '../components/Head';
import { InputBase } from '@material-ui/core';
import { Paper, Chip } from 'material-ui';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import socketIOClient from 'socket.io-client';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const classes = {
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
    right: 0,
    left: 'auto',
    position: 'absolute',
    top: 0
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
}

export interface PhoneProps {
  phoneNumber: string
}

export interface SMS{
  msisdn: string
  content: string
  sender: string
}

const Phone:FC<PhoneProps> = ({phoneNumber}) => {
  const [messages, setMessages] = useState<SMS[]>([])
  useEffect()
  return (
    <React.Fragment>
      <MuiThemeProvider>
        <Paper style={{ width: 400, height: 600, position: 'relative' }}>
          <Head title="Messaging" />
          <Box
            ref={(el) => { this.el = el; }}
            style={{
              marginTop: 6, padding: 10, height: 450, overflowX: 'auto'
              }}
          >
            {
              messages.map((element, index) => (
                <Box key={`${index}-key`} style={{ position: 'relative' }}>
                  <small>
                    {element.from}
                  </small>
                  <Chip style={{ padding: 10, right: 0, position: 'relative' }}>
                    {element.message}
                  </Chip>
                </Box>
                ))
            }
          </Box>

          <Paper style={{
             position: 'absolute', top: 'auto', width: '100%', flex: 1, bottom: 0, padding: 10
            }}
          >
            <InputBase
              style={classes.input}
              placeholder="Text Message"
              inputProps={{ 'aria-label': 'search google maps' }}
            />
            <IconButton color="primary" style={classes.iconButton} aria-label="send">
              <SendIcon />
            </IconButton>
          </Paper>
        </Paper>
      </MuiThemeProvider>
    </React.Fragment>)
}
// export default class extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       messages: [{
//         from: 'Mainapi',
//         message: 'Lorem ipsum',
//         type: 'recieved',
//       }],
//       phoneNumber: ''
//     };
//     this.socket = null;
//   }
//   componentWillMount() {
//     // eslint-disable-next-line no-restricted-globals
//     this.socket = socketIOClient(location.origin);
//     this.socket.on('message', (data) => {
//       // eslint-disable-next-line no-param-reassign
//       data.type = 'recieved';
//       // eslint-disable-next-line prefer-destructuring
//       const messages = this.state.messages;
//       this.setState({ messages: [...messages, data] });
//     });
//   }
//   componentWillReceiveProps(props) {
//     if (this.state.phoneNumber !== props.phoneNumber) {
//       this.setPhoneNumber(props.phoneNumber);
//     }
//   }
//   setPhoneNumber(phoneNumber) {
//     this.socket.emit('join', phoneNumber);
//     this.setState({ phoneNumber });
//   }
//   render() {
//     return (
//       <React.Fragment>
//         <MuiThemeProvider>
//           <Paper style={{ width: 400, height: 600, position: 'relative' }}>
//             <Head title="Messaging" />
//             <Box
//               ref={(el) => { this.el = el; }}
//               style={{
//  marginTop: 6, padding: 10, height: 450, overflowX: 'auto'
//  }}
//             >
//               {
//                 this.state.messages.map((element, index) => (
//                   <Box key={`${index}-key`} style={{ position: 'relative' }}>
//                     <small>
//                       {element.from}
//                     </small>
//                     <Chip style={{ padding: 10, right: 0, position: 'relative' }}>
//                       {element.message}
//                     </Chip>
//                   </Box>
//                   ))
//               }
//             </Box>

//             <Paper style={{
//  position: 'absolute', top: 'auto', width: '100%', flex: 1, bottom: 0, padding: 10
// }}
//             >
//               <InputBase
//                 style={classes.input}
//                 placeholder="Text Message"
//                 inputProps={{ 'aria-label': 'search google maps' }}
//               />
//               <IconButton color="primary" style={classes.iconButton} aria-label="send">
//                 <SendIcon />
//               </IconButton>
//             </Paper>
//           </Paper>
//         </MuiThemeProvider>
//       </React.Fragment>
//     );
//   }
// }

export default Phone