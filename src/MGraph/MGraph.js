import React from "react";
import GenericCard from "../Cards/GenericCard";
import {Graph} from "react-d3-graph";


const displayGraph = (graph) => {
  const dispGraph = {
    nodes: Object.values(graph.nodes),
    links: Object.values(graph.edges)
  }
  // dispGraph.nodes = dispGraph.nodes.map((node) => {
  //   //node.viewGenerator = (n) => {return <GenericCard uzel={n}/>}
  //   //node.size = 3000
  //   return node
  // })
  return dispGraph
};

const myConfig = {
  nodeHighlightBehavior: true,
  node: {
    color: "lightgreen",
    highlightStrokeColor: "blue",
    viewGenerator: (n) => {
      return <GenericCard uzel={n}/>
    },
    size: 3000
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

const MGraph = (props) => {
  return <Graph
    id="d3graph" // id is mandatory, if no id is defined rd3g will throw an error
    data={displayGraph(props.visibleGraph.toJS())}
    config={myConfig}
  />
}

const areEqual = (prevProps, nextProps) => {
  return prevProps.visibleGraph === nextProps.visibleGraph;
}

export default React.memo(MGraph, areEqual);