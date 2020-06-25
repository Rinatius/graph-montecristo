import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

import BubbleChartIcon from '@material-ui/icons/BubbleChart';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const NestedLinks = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  console.log('NESTED LINKS')
  // console.log(props.node)
  // console.log(props.vGraph.toJS())
  // console.log(props.iGraph.toJS()) 
  
  console.log(Object.keys(props.iGraph.toJS().edges)) 

  const vNodes = props.vGraph.toJS().nodes
  const vEdges = props.vGraph.toJS().edges

  const iNodes = props.iGraph.toJS().nodes
  const iEdges = props.iGraph.toJS().edges
  
  console.log(props.node.id)

  let listOfRelationships = Object.keys(iEdges).map((key) => {
    if (props.node.id.toString() == iEdges[key].source.toString() || props.node.id.toString() == iEdges[key].target.toString()){
      return iEdges[key].type
    }
  }).reduce(function(obj, relation){
      if (!obj[relation]) {
          obj[relation] = 1;
      } else {
          obj[relation]++;
      }
      return obj;
  }, {});

   //Delete 'undefined' in listOfRelationships
   listOfRelationships = Object.keys(listOfRelationships).reduce((object, key) => {
    if (key !== 'undefined') {
      object[key] = listOfRelationships[key]
    }
    return object
  }, {})
 
  const getKeyRelationshipIds = (type) => {
    console.log("getKeyRelationshipIds")
   
    let keys = Object.keys(iEdges).map((key) => {
     
      if ((iEdges[key].type == type) && (props.node.id.toString() == iEdges[key].source.toString() || props.node.id.toString() == iEdges[key].target.toString())){
        return key
      }
    })

    keys = keys.filter(function( element ) {
      return element !== undefined;
    });

    return keys
  };


  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      // subheader={
      //   <ListSubheader component="div" id="nested-list-subheader">
      //     Nested List Items
      //   </ListSubheader>
      // }
      className={classes.root}
    >

      {Object.keys(listOfRelationships).map((key) => {
        const keys = getKeyRelationshipIds(key)
        return (<ListItem button onClick={() => props.onButtonClick(keys)}>
          <ListItemIcon>
            <BubbleChartIcon />
          </ListItemIcon>
          <ListItemText primary={key + ' (' + listOfRelationships[key] + ')'}  />
        </ListItem>)
      })}
      <ListItem button onClick={handleClick}>
        {/*<ListItemIcon>*/}
        {/*  <InboxIcon />*/}
        {/*</ListItemIcon>*/}
        <ListItemText primary="Директор" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            {/*<ListItemIcon>*/}
            {/*  <StarBorder />*/}
            {/*</ListItemIcon>*/}
            <ListItemText primary="Такойто Токтотович" />
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
}

const areEqual = (prevProps, nextProps) => {
  return ((prevProps.vGraph === nextProps.vGraph) && 
          (prevProps.iGraph === nextProps.iGraph) &&
          (prevProps.node === nextProps.node));
}

export default React.memo(NestedLinks, areEqual);