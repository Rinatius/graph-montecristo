import React, { Component } from 'react';
import './App.css';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import neo4j from 'neo4j-driver'
import Immutable from 'immutable'

import { Graph } from "react-d3-graph";

import './my-svg.svg'
import GenericCard from "./Cards/GenericCard";
import MGraph from "./MGraph/MGraph";


class App extends Component {

  driver = neo4j.driver('bolt://neo4j.kloop.io:7687')

  state = {
    cypherQuery: "MATCH (n) where id(n) in [2429298] return n",
    data: {},
    dataText: "",
    visibleGraph: Immutable.fromJS({nodes: {}, edges: {}}),
    invisibleGraph: Immutable.fromJS({nodes: {}, edges: {}})
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
        const invisibleSession = this.driver.session()
        const paramIDs = Object.keys(updatedVisibleGraph.nodes).toString()
        invisibleSession
          .run("MATCH (n)-[r]-(b) WHERE ID(n) in ["+ paramIDs +"] RETURN n, r, b")
          .then(result => {
            const updatedInvisibleGraph = this.toGraph(result,
              this.state.invisibleGraph.toJS())
            updatedVisibleGraph = this.reconcileGraphs(updatedVisibleGraph,
              updatedInvisibleGraph)
            this.setState({
              visibleGraph: Immutable.fromJS(updatedVisibleGraph)
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
      if (Object.keys(vGraph.nodes).includes(iGraph.edges[key].source.toString()) &&
      Object.keys(vGraph.nodes).includes(iGraph.edges[key].target.toString())) {
        vGraph.edges[key] = iGraph.edges[key]
      }
    })
    return vGraph
  }

  render() {
    let graph = null
    console.log(Object.keys(this.state.visibleGraph.toJS().nodes).length)
    if (Object.keys(this.state.visibleGraph.toJS().nodes).length !== 0) {
      graph = <MGraph visibleGraph={this.state.visibleGraph}/>
    }
    return (
      <div className="App">
        <TextField id="query"
                   label="Query"
                   value={this.state.cypherQuery}
                   onChange={this.handleCypherQueryTextChange}
        />
        <Button variant="contained"
                onClick={this.handleGoClick}>Go</Button>
        {graph}
      </div>
    );
  }
}

export default App;
