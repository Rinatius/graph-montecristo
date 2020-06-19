import React, { Component } from 'react';
import './App.css';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import neo4j from 'neo4j-driver'
import Immutable from 'immutable'

import { Graph } from "react-d3-graph";

import './my-svg.svg'


class App extends Component {

  driver = neo4j.driver('bolt://neo4j.kloop.io:7687')

  state = {
    cypherQuery: "",
    data: {},
    dataText: "",
    visibleGraph: Immutable.fromJS({nodes: {}, edges: {}}),
    invisibleGraph: Immutable.fromJS({nodes: {}, edges: {}}),
    displayGraph: {nodes:[{id:1}, {id:4}], links: [{source:1, target:4}]}
  }

  handleGoClick = () => {
    this.executeQuery(this.state.cypherQuery)
  }

  executeQuery = (cypherQuery) => {
    const session = this.driver.session()
    session
      .run(cypherQuery)
      .then(result => {
        let updatedVisibleGraph = this.toGraph(result, this.state.visibleGraph.toJS())
        console.log(result.records)
        console.log(result.records[0].keys)
        console.log(updatedVisibleGraph)
        console.log(Object.keys(updatedVisibleGraph.nodes).toString())
        const invisibleSession = this.driver.session()
        const paramIDs = Object.keys(updatedVisibleGraph.nodes).toString()
        invisibleSession
          .run("MATCH (n)-[r]-(b) WHERE ID(n) in ["+ paramIDs +"] RETURN n, r, b")
          .then(result => {
            console.log(result)
            const updatedInvisibleGraph = this.toGraph(result,
              this.state.invisibleGraph.toJS())
            updatedVisibleGraph = this.reconcileGraphs(updatedVisibleGraph,
              updatedInvisibleGraph)
            console.log(updatedInvisibleGraph)
            console.log(updatedVisibleGraph)
            this.setState({
              visibleGraph: Immutable.fromJS(updatedVisibleGraph),
              displayGraph: this.displayGraph(updatedVisibleGraph)
            })

          })
          .catch(error => {
            console.log(error)
          })
          .then(() => session.close())

      })
      .catch(error => {
        console.log(error)
      })
      .then(() => session.close())

  }

  handleCypherQueryTextChange = (event) => {
    this.setState({cypherQuery: event.target.value})
  }

  toGraph = (result, graph) => {
    result.records.forEach((records, i) => {
      records.keys.forEach((key) => {
        const nodge = records.get(key)
        if (nodge.hasOwnProperty('start')) { //Check if it is edge
          graph.edges[nodge.identity.low] = {
            source: nodge.start.low,
            target: nodge.end.low,
            type: nodge.type,
            properties: nodge.properties
          }
        } else {
          graph.nodes[nodge.identity.low] = {
            id: nodge.identity.low,
            labels: nodge.labels,
            properties: nodge.properties
          }
        }
      })
    })
    return graph;
  }

  reconcileGraphs = (vGraph, iGraph) => {
    Object.keys(iGraph.edges).forEach((key) => {
      // console.log(Object.keys(vGraph.nodes))
      // console.log(iGraph.edges[key].from.toString())
      // console.log(Object.keys(vGraph.nodes).includes(iGraph.edges[key].from.toString()))
      // console.log(Object.keys(vGraph.nodes).includes(iGraph.edges[key].to.toString()))
      if (Object.keys(vGraph.nodes).includes(iGraph.edges[key].source.toString()) &&
      Object.keys(vGraph.nodes).includes(iGraph.edges[key].target.toString())) {
        vGraph.edges[key] = iGraph.edges[key]
      }
    })
    return vGraph
  }

  displayGraph = (graph) => {
    const dispGraph = {
      nodes: Object.values(graph.nodes),
      links: Object.values(graph.edges)
    }
    dispGraph.nodes = dispGraph.nodes.map((node) => {
      node.svg = 'https://fonts.gstatic.com/s/i/materialicons/account_circle/v6/24px.svg'
      //node.symbolType = "square"
      node.viewGenerator = (n) => <div>{JSON.stringify(n)}</div>
      node.size = 1000
      return node
    })
    return dispGraph
  }


  check = {nodes: [{id: 1}, {id: 4}], links: [{source: 1, target: 4}]}

  myConfig = {
    nodeHighlightBehavior: true,
    node: {
      color: "lightgreen",
      size: 120,
      highlightStrokeColor: "blue",
    },
    "d3": {
      "linkLength": 300,
      "linkStrength": 0.1,
    },
    link: {
      highlightColor: "lightblue",
    },
  };

  render() {
    return (
      <div className="App">
        <TextField id="query"
                   label="Query"
                   value={this.state.cypherQuery}
                   onChange={this.handleCypherQueryTextChange}
        />
        <Button variant="contained"
                onClick={this.handleGoClick}>Go</Button>
        {}
        <Graph
          id="d3graph" // id is mandatory, if no id is defined rd3g will throw an error
          data={this.state.displayGraph}
          config={this.myConfig}
        />

      </div>
    );
  }
}

export default App;
