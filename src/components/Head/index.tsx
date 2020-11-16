import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export interface HeadProps {
  title: string
}

const Head: FC<HeadProps> = (props) =>{
  const style = useStyles()
  return (
    <div style={ {
      flexGrow: 1,
    }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={style.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={style.title}>
            {props.title}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
} 

export default Head