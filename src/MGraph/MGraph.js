import React from "react";
import GenericCard from "../Cards/GenericCard";
import CompanyCard from "../Cards/CompanyCard";
import DirectorCard from "../Cards/DirectorCard";
import FounderCard from "../Cards/FounderCard";
import LotCard from "../Cards/LotCard";
import ParticipantCard from "../Cards/ParticipantCard";
import {Graph} from "react-d3-graph";
import Card from '../Cards/Card'

const displayGraph = (graph) => {
  const dispGraph = {
    nodes: Object.values(graph.nodes),
    links: Object.values(graph.edges),
  }
  // dispGraph.nodes = dispGraph.nodes.map((node) => {
  //   //node.viewGenerator = (n) => {return <GenericCard uzel={n}/>}
  //   //node.size = 3000
  //   return node
  // })
  return dispGraph
};

const MGraph = (props) => {
  console.log('MGRAPH')
  console.log(props)
  console.log(props.visibleGraph.toJS())
  console.log(props.invisibleGraph.toJS()) 

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