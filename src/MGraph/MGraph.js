import React from "react";
import {Graph} from "react-d3-graph";
import Card from '../Cards/Card';
import CardConfig from '../config';
import relationshipConfig from '../config';
import translate from '../Cards/utils/translate';
import shorten from '../Cards/utils/shorten';

const displayGraph = (props) => {

  const dispGraph = {
    nodes: Object.values(props.visibleGraph.toJS().nodes),
    links: Object.values(props.visibleGraph.toJS().edges),
  }

  let cardNodeIds = props.cardNodeIds.toJS()
  //console.log('mgraph card nodes: ', cardNodeIds)
  dispGraph.nodes = dispGraph.nodes.map((node) => {

    // if node.id is in array, apply viewGenerator

    if (cardNodeIds.includes(node.id)) { 
     node.size = 3000;
     node.dispLabel = " "
     node.viewGenerator = (n) => {
      return <Card 
                node={n}
                vGraph={props.visibleGraph} 
                iGraph={props.invisibleGraph} 
                onButtonClick={props.onButtonClick}
                onMinimizeClick={props.onMinimizeClick} />
    }} else { // else return SVG icon 
      node.svg = CardConfig[node.labels[0]].svg
      node.size = 600
      node.fontSize = 16
      node.dispLabel = shorten(node.properties[CardConfig[node.labels[0]].contentTextParam])
    }

    return node
   })


   dispGraph.links = dispGraph.links.map((link) => {
     if (Object.keys(link.properties).length !== 0) {
        link.label = Object.values(link.properties).join(" ")
     }
     else {
      link.label = translate(link.type, 'ru')
    }
     return link
   })

  return dispGraph
};

const MGraph = (props) => {
  

  const myConfig = {
    height:'600px',
    width:'100%',
    staticGraphWithDragAndDrop: true,
    // nodeHighlightBehavior: true,
    node: {
      labelProperty: "dispLabel"
    },
    //   color: "lightgreen",
    //   labelProperty: 'label',
    //   highlightStrokeColor: "blue",
    //   size: 3300,
    //   fontSize: 16
    //
    //
    // }
    // ,
    "d3": {
      "linkLength": 300,
      "linkStrength": 0.1,
    },
    link: {
      highlightColor: "lightblue",
      renderLabel: true,
      labelProperty: 'label'

    },
  };

  return <Graph
    config={myConfig}
    id="d3graph" // id is mandatory, if no id is defined rd3g will throw an error
    data={displayGraph(props)}
    
  />
}

const areEqual = (prevProps, nextProps) => {
  return (prevProps.visibleGraph === nextProps.visibleGraph) 
          && (prevProps.invisibleGraph === nextProps.invisibleGraph)
          && (prevProps.cardNodeIds === nextProps.cardNodeIds)
}

export default React.memo(MGraph, areEqual);

