import React from "react";
import {Graph} from "react-d3-graph";
import Card from '../Cards/Card';
import CardConfig from '../config';


const displayGraph = (props) => {

  const dispGraph = {
    nodes: Object.values(props.visibleGraph.toJS().nodes),
    links: Object.values(props.visibleGraph.toJS().edges),
  }
  const card_nodes_ids = [9350, 18766, 371947]
  dispGraph.nodes = dispGraph.nodes.map((node) => {

    // if node.id is in array, apply viewGenerator

    if (card_nodes_ids.includes(node.id)) { 
     node.size = 3000
     node.renderLabel = true
     node.label = CardConfig[node.labels[0]].contentTextParam
     node.viewGenerator = (n) => {
      return <Card 
                node={n}
                vGraph={props.visibleGraph} 
                iGraph={props.invisibleGraph} 
                onButtonClick={props.onButtonClick} />
    }}

    // else return SVG icon

    else {
      node.svg = CardConfig[node.labels[0]].svg
      console.log("SVG ", node)
      node.size = 600
      node.renderLabel = true
      node.label = CardConfig[node.labels[0]].contentTextParam
      
    }
    return node
   }) 
  return dispGraph
};

const MGraph = (props) => {

  const myConfig = {
    height:'600px',
    width:'100%',
    staticGraphWithDragAndDrop: true,
    nodeHighlightBehavior: true,
    node: {
      color: "lightgreen",
      labelProperty: 'label',
      highlightStrokeColor: "blue",
      size: 3300,
      fontSize: 16

    }
    ,
    "d3": {
      "linkLength": 300,
      "linkStrength": 0.1,
    },
    link: {
      highlightColor: "lightblue",
    },
  };

  return <Graph
    id="d3graph" // id is mandatory, if no id is defined rd3g will throw an error
    data={displayGraph(props)}
    config={myConfig}
  />
}

const areEqual = (prevProps, nextProps) => {
  return (prevProps.visibleGraph === nextProps.visibleGraph) && (prevProps.invisibleGraph === nextProps.invisibleGraph);
}

export default React.memo(MGraph, areEqual);

