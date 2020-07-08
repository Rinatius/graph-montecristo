import React from 'react'
import Typography from '@material-ui/core/Typography';
import cardConfig from '../config'
import shorten from './utils/shorten'
import { makeStyles } from '@material-ui/core/styles';
import translate from '../Cards/utils/translate';
import formatDate from '../Cards/utils/formatDate';

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
                <Typography key={prop + label} variant="body2" color="textPrimary" component="p">
                    {prop === 'publication_date' ? translate(prop, 'ru') + ': ' + formatDate(props.node.properties[prop]) : translate(prop, 'ru') + ': ' +props.node.properties[prop] }
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
const areEqual = (prevProps, nextProps) => {
  return (prevProps.node.properties === nextProps.node.properties)
}

export default React.memo(NestedProperties, areEqual);