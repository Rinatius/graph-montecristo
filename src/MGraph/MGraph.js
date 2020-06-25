import React from "react";
import GenericCard from "../Cards/GenericCard";
import CompanyCard from "../Cards/CompanyCard";
import DirectorCard from "../Cards/DirectorCard";
import FounderCard from "../Cards/FounderCard";
import LotCard from "../Cards/LotCard";
import ParticipantCard from "../Cards/ParticipantCard";
import {Graph} from "react-d3-graph";

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

    height:800,
    width:1200,
    nodeHighlightBehavior: true,
    node: {
      color: "lightgreen",
      highlightStrokeColor: "blue",
      viewGenerator: (n) => {
        console.log(n)
        if (n.labels.includes("KgMinjust")) {
          console.log("KgMinjust")
          return <CompanyCard node={n} vGraph={props.visibleGraph} iGraph={props.invisibleGraph} />        
       
        } else if(n.labels.includes("KgMinjustParticipants")) {
          console.log("KgMinjustParticipants")
          return <FounderCard node={n} vGraph={props.visibleGraph} iGraph={props.invisibleGraph} />
        
        } else if(n.labels.includes("HeadNameSur")) {
          console.log("HeadNameSur")
          return <DirectorCard node={n} vGraph={props.visibleGraph} iGraph={props.invisibleGraph} />
  
        } else if(n.labels.includes("KgProcurementParticipants")) {
          console.log("KgProcurementParticipants")
          return <ParticipantCard node={n} vGraph={props.visibleGraph} iGraph={props.invisibleGraph} />
  
        } else if(n.labels.includes("KgProcurementLots")) {
          console.log("KgProcurementLots")
          return <LotCard node={n} vGraph={props.visibleGraph} iGraph={props.invisibleGraph} />
  
        } else {
          return <GenericCard uzel={n}/>
        }
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
  return prevProps.visibleGraph === nextProps.visibleGraph;
}

export default React.memo(MGraph, areEqual);