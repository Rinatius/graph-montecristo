import React from 'react'
import Typography from '@material-ui/core/Typography';
import cardConfig from '../config'
import shorten from './utils/shorten'


const nestedProperties = (props) => {
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
            <Typography variant="h5" color="textPrimary" component="p">
                { shorten(props.node.properties[cardConfig[label].contentTextParam]) }
            </Typography>
        {listOfProps}
        </div>
    )
}

export default nestedProperties