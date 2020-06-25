import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import BusinessIcon from '@material-ui/icons/Business';

import NestedLinks from './NestedLinks'
import shorten from './utils/shorten'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 180,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
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
}));

const RecipeReviewCard = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <BusinessIcon />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        subheader={<a href={props.node.properties.url} target="_blank">Минюст</a>}
      />
      {/*<CardMedia*/}
      {/*  className={classes.media}*/}
      {/*  image="/static/images/cards/paella.jpg"*/}
      {/*  title="Paella dish"*/}
      {/*/>*/}
      <CardContent>
        <Typography variant="body2" color="textPrimary" component="p">
          {shorten(props.node.properties.name_ru)}
        </Typography>
        <NestedLinks
          node={props.node}
          vGraph={props.vGraph}
          iGraph={props.iGraph}
          onButtonClick={props.onButtonClick} />
      </CardContent>
      <CardActions disableSpacing>
        {/*<IconButton aria-label="add to favorites">*/}
        {/*  <FavoriteIcon />*/}
        {/*</IconButton>*/}
        {/*<IconButton aria-label="share">*/}
        {/*  <ShareIcon />*/}
        {/*</IconButton>*/}
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {JSON.stringify(props.node.properties, null, 2)}
        </CardContent>
      </Collapse>
    </Card>
  );
}

const areEqual = (prevProps, nextProps) => {
  return ((prevProps.vGraph === nextProps.vGraph) && 
          (prevProps.iGraph === nextProps.iGraph) &&
          (prevProps.node === nextProps.node));
}

export default React.memo(RecipeReviewCard, areEqual);