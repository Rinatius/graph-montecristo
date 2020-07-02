import React from "react";
import GenericCard from "../Cards/GenericCard";
import CompanyCard from "../Cards/CompanyCard";
import DirectorCard from "../Cards/DirectorCard";
import FounderCard from "../Cards/FounderCard";
import LotCard from "../Cards/LotCard";
import ParticipantCard from "../Cards/ParticipantCard";
import {Graph} from "react-d3-graph";
import Card from '../Cards/Card'
import CardConfig from '../config'




const displayGraph = (graph) => {
  //console.log('GRAPH.NODES IN DISPLAY GRAPH ', Object.values(graph.nodes))
  const dispGraph = {
    nodes: Object.values(graph.nodes),
    links: Object.values(graph.edges),
  }
  const card_nodes_ids = [9350, 18766, 371947]
  dispGraph.nodes = dispGraph.nodes.map((node) => {

    // if node.id is in array, apply viewGenerator

    console.log("NODE: ", )

    if (card_nodes_ids.includes(node.id)) { 
     node.size = 3000
     //console.log("CARD NODE ", node)
     return node
    }
    // else return SVG icon

    else {
      node.svg = CardConfig[node.labels[0]].icon
      node.viewGenerator = () => {console.log("HERE", node.svg); return node.svg}
      node.size = 900
      return node
    }
   })
  console.log('DisGraph ', dispGraph) 
  return dispGraph
};

const MGraph = (props) => {

  const myConfig = {
    height:1080,
    width:1920,
    staticGraphWithDragAndDrop: true,
    nodeHighlightBehavior: true,
    node: {
      color: "lightgreen",
      highlightStrokeColor: "blue",
      viewGenerator: (n) => {
        return <Card 
                  node={n}
                  vGraph={props.visibleGraph} 
                  iGraph={props.invisibleGraph} 
                  onButtonClick={props.onButtonClick} />
      },
      size: 3300,
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
    data={displayGraph(props.visibleGraph.toJS())}
    config={myConfig}
  />
}

const areEqual = (prevProps, nextProps) => {
  return (prevProps.visibleGraph === nextProps.visibleGraph) && (prevProps.invisibleGraph === nextProps.invisibleGraph);
}

export default React.memo(MGraph, areEqual);

