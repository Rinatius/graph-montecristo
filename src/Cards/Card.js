import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MinimizeIcon from '@material-ui/icons/Minimize';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Divider from '@material-ui/core/Divider'

import NestedLinks from './NestedLinks'
import shorten from './utils/shorten'
import NestedProperties from './NestedProperties'
import cardConfig from '../config'

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 240,
      textAlign: "left",
      height : 320
    },
    media: {
      height: 0,
      // paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
    cardContent: {
      paddingTop: 0,
      paddingBottom: 0
    }
  }));

  const RecipeReviewCard = (props) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
  
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    let style = {}
    let avatar = ''
    let subheader = ''
    if (Object.keys(cardConfig).includes(props.node.labels[0])) {
      const label = props.node.labels[0]
      style = cardConfig[label].style 
      avatar = cardConfig[label].icon 
      subheader =
        <a 
          href={props.node.properties[cardConfig[label].subHeaderUrlParam]} 
          target="_blank">{cardConfig[label].subHeaderText}
        </a>
    }
  
    return (
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar} style={style}>
              {avatar}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MinimizeIcon onClick={() => props.onMinimizeClick(props.node.id)}/>
            </IconButton>
          }
          subheader={<Typography>{subheader}</Typography>} 
        />
        <CardContent className={classes.cardContent}>
          <NestedProperties node={props.node}/>
          <Divider style={{marginTop: 8}} />
          <NestedLinks
            node={props.node}
            vGraph={props.vGraph}
            iGraph={props.iGraph}
            onButtonClick={props.onButtonClick}  />
        </CardContent>
      </Card>
    );
  }
  
  const areEqual = (prevProps, nextProps) => {
    return ((prevProps.vGraph === nextProps.vGraph) && 
            (prevProps.iGraph === nextProps.iGraph) &&
            (prevProps.node === nextProps.node));
  }
  
  export default React.memo(RecipeReviewCard, areEqual);