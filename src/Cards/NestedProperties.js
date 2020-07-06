import React from 'react'
import Typography from '@material-ui/core/Typography';
import cardConfig from '../config'
import shorten from './utils/shorten'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    contentTextParam: {
        fontWeight: "bold",
        marginBottom: "5px"
    }
}));

const NestedProperties = (props) => {
    const classes = useStyles();
    let listOfProps = []
    const label = props.node.labels[0]
    if (Object.keys(cardConfig).includes(label)) {
        cardConfig[label].properties.forEach(prop => {
        if (cardConfig[label].properties 
                && cardConfig[label].properties.includes(prop)
                && cardConfig[label].contentTextParam !== prop) {
            listOfProps.push(
                <Typography variant="body2" color="textPrimary" component="p">
                    { props.node.properties[prop] }
                </Typography>
            )
        }
        });
    }
    console.log( props.node.properties[cardConfig[label].contentTextParam] )
    return (
        <div>
            <Typography className={classes.contentTextParam} variant="body2" color="textPrimary" component="p" >
                { shorten(props.node.properties[cardConfig[label].contentTextParam]) }
            </Typography>
        {listOfProps}
        </div>
    )
}

export default NestedProperties