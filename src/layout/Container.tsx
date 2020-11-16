import React, { ChangeEvent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Head from '../components/Head/index';
// eslint-disable-next-line import/first
import { Button } from '@material-ui/core';
import Phone from './Phone';

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
}));
function random(length: number) {
  let result = '';
  const characters = '0123456789';
  const charactersLength = characters.length;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export default function Container() {
  // eslint-disable-next-line no-unused-vars
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  const [values, setValues] = React.useState({
    phoneNumber: '',
  });
  const handleChange = (name: string) => (event: ChangeEvent) => {
    const value = (event.target as any).value
    setValues({ ...values, [name]: value });
  };
  function generateRandomNumber() {
    const randomNumber = random(10);
    setValues({ ...values, phoneNumber: `08${randomNumber}` });
    //   console.log(values)
  }
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

              </div>
            </Paper>
          </Grid>
          <Grid spacing={10} >
            Phone
            <Phone phoneNumber={values.phoneNumber} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}