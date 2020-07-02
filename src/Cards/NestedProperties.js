import React from 'react'
import Typography from '@material-ui/core/Typography';
import cardConfig from '../config'


const nestedProperties = (props) => {
    let listOfProps = []
    const label = props.node.labels[0]
    console.log(label)
    if (Object.keys(cardConfig).includes(label)) {
        Object.keys(props.node.properties).forEach(prop => {
        if (cardConfig[label].properties && cardConfig[label].properties.includes(prop)) {
            console.log(prop)
            console.log( props.node.properties[cardConfig[label][prop]] )
            listOfProps.push(
                <Typography variant="body2" color="textPrimary" component="p">
                    { props.node.properties[prop] }
                </Typography>
            )
        }
        });
    }
    console.log(listOfProps)
    return (
        listOfProps
    )
}

export default nestedProperties