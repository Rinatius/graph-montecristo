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
        console.log("THIS IS N", n)
        return <Card node={n} vGraph={props.visibleGraph} iGraph={props.invisibleGraph} onButtonClick={props.onButtonClick} />
      },
      "link": {
        "color": "#d3d3d3",
        "fontColor": "black",
        "fontSize": 8,
        "fontWeight": "normal",
        "highlightColor": "SAME",
        "highlightFontSize": 8,
        "highlightFontWeight": "normal",
        "labelProperty": "label",
        "mouseCursor": "pointer",
        "opacity": 1,
        "renderLabel": false,
        "semanticStrokeWidth": false,
        "strokeWidth": 1.5,
        "markerHeight": 6,
        "markerWidth": 6
      },
      size: 4000
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