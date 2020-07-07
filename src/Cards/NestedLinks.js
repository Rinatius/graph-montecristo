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
import AccountTreeIcon from '@material-ui/icons/AccountTree';

import translate from './utils/translate'
import cardConfig from '../config'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: '1px',
  },
  nested: {
    paddingLeft: theme.spacing(4),
    padding: '1px'
  },
  listItemIcon: {
    minWidth: 'auto'
  }
}));

const NestedLinks = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  // console.log(props.node)
  // console.log(props.vGraph.toJS())
  // console.log(props.iGraph.toJS()) 

  const vNodes = props.vGraph.toJS().nodes
  const vEdges = props.vGraph.toJS().edges

  const iNodes = props.iGraph.toJS().nodes
  const iEdges = props.iGraph.toJS().edges
  

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

  const label = props.node.labels[0]

  let listOfLinks = Object.keys(listOfRelationships).map((key) => {
    if (cardConfig[label] 
        && cardConfig[label].links 
        && cardConfig[label].links.includes(key)) {
      const keys = getKeyRelationshipIds(key)

      let newKey = ''

      // if node.reverseLinks AND key in reverseLinks: 
      
      if (Object.keys(cardConfig[label].reverseLinks).length !== 0 && Object.keys(cardConfig[label].reverseLinks).includes(key)) {
        newKey = cardConfig[label].reverseLinks[key]
        //console.log("1 LIST OF RELS:", listOfRelationships, "| KEY:", key, "| NODE: ", label)
        //console.log("2 KEY: ", key, "| NEW KEY:", newKey, "| reverseLinks: ", cardConfig[label].reverseLinks)
      }
      else {
        newKey = key
      }
  
          
      return(
        <ListItem style={{padding: '1px'}} button onClick={() => props.onButtonClick(keys)}>          
          <ListItemText primary={translate(newKey, 'ru') + ' (' + listOfRelationships[key] + ')'} primaryTypographyProps={{variant:"body2"}} />
          <ListItemIcon className={classes.listItemIcon}>
            <AccountTreeIcon />
          </ListItemIcon>
        </ListItem>)
    }
  })


  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      {listOfLinks}
    </List>
  );
}

const areEqual = (prevProps, nextProps) => {
  return ((prevProps.vGraph === nextProps.vGraph) && 
          (prevProps.iGraph === nextProps.iGraph) &&
          (prevProps.node === nextProps.node));
}

export default React.memo(NestedLinks, areEqual);