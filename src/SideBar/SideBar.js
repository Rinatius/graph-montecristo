import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import TextField from '@material-ui/core/TextField';
import * as gh from '../components/graphHelpers.js'
import CancelIcon from '@material-ui/icons/Cancel';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: 'auto',
  },
  menuButton: {
      left: 0,
      position: 'fixed',
      margin: 20
  },
  Button: {
    margin: 5
  },
  GoButton: {
    background: '#A5D6A7'
  },
  Query: {
      margin: 8
  }
});

export default function Sidebar(props) {

  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: !state.left });
  };

  const list = (anchor) => (
    <div
      className={classes.list}
      role="presentation"
      //onClick={toggleDrawer(anchor, false)}
    >
      <List>
        {['Enter your query below'].map((text, index) => (
          <ListItem key={text}>
            <ListItemText primary={text} />
            <CancelIcon
          fontSize="medium"
          onClick={toggleDrawer('left')}
          className={classes.Button}/>
          </ListItem>
          
        ))}
      </List>
      <List>
          <TextField
           id="query"
           label="Query"
           variant="outlined" 
           multiline
           value={props.value}
           onChange={props.onChange}
           className={classes.Query}/>
      </List>
      <List>
      <div>
        <Button variant="contained"
                className={classes.GoButton}
                onClick={props.goButtonClicked}
                startIcon={<PlayArrowIcon />}>Run Query</Button>
        
      </div>
      </List>
    </div>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}><MenuIcon className={classes.menuButton}/></Button>
          <Drawer variant='persistent' anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}