import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import organizationLogo from './Icons/organization.png';
import directorLogo from './Icons/director.png'
import lotLogo from './Icons/lot.png'
import lotParticipant from './Icons/participant.png'


const useStyles = makeStyles({
  root: {
    maxWidth: 50,
    maxHeight: 50

  },
  media: {
   height: 40,
  },
});


const nodeLogo = (node) => {

  if(node.labels[0]=="KgMinjust"){
    return (organizationLogo)
  }       
    
   if(node.labels[0]=="KgMinjustParticipants"){
    return (directorLogo)
  }  

  if(node.labels[0]=="HeadNameSur"){
    return (directorLogo)
  }    

  if(node.labels[0]=="KgProcurementLots"){
    return (lotLogo)
  } 

  if(node.labels[0]=="KgProcurementParticipants"){
    return (lotParticipant)
  } 
}

const NodeProperties = (node, classes) => {

  // console.log(node)
  
  // if(!node.children){
  //   console.log("DONT WORK")}
  // else{
  //   console.log("WORK")
  // }

  if(node.children[1].labels[0]=="KgMinjust"){
    return (<CardContent>
            <Typography gutterBottom variant="h5" component="h2">
            {node.children[1].properties.name_ru.slice(0, 30)}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              ИНН: {node.children[1].properties.inn.slice(0, 30) } <br></br>
              Директор: {node.children[1].properties.head_name_sur } <br></br>
              Деятельность: {node.children[1].properties.main_activity_type } <br></br>
            </Typography>
          </CardContent>)}

  if(node.children[1].labels[0]=="KgMinjustParticipants"){
    return (<CardContent>
            <Typography gutterBottom variant="h5" component="h2">
            {node.children[1].properties.name.slice(0, 30)}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Ссылка: {node.children[1].properties.org_url } <br></br>              
            </Typography>
          </CardContent>)}

  if(node.children[1].labels[0]=="HeadNameSur"){
    return (<CardContent>
            <Typography gutterBottom variant="h5" component="h2">
            {node.children[1].properties.head_name_sur.slice(0, 30)}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Ссылка: {node.children[1].properties.url } <br></br>
            </Typography>
          </CardContent>)}   
          
  if(node.children[1].labels[0]=="KgProcurementParticipants"){
    return (<CardContent>
            <Typography gutterBottom variant="h5" component="h2">
            {node.children[1].properties.name.slice(0, 30)}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              ИНН: {node.children[1].properties.inn.slice(0, 30) } <br></br>
            </Typography>
          </CardContent>)}

  if(node.children[1].labels[0]=="KgProcurementLots"){
    return (<CardContent>
            <Typography gutterBottom variant="h5" component="h2">
            {node.children[1].properties.lot_name.slice(0, 30)}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Сумма лота: {node.children[1].properties.lot_sum_int} <br></br>
              Класс лота: {node.children[1].properties.lot_class } <br></br>
            </Typography>
          </CardContent>)}
}

export default function GenericCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>   

        <CardMedia
          className={classes.media}
          image={nodeLogo(props.uzel)}
          title="Contemplative Reptile"
        />

        <NodeProperties>
          node={props.uzel}
          classes={classes}
        </NodeProperties>

      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}