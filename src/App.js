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
    cypherQuery: "MATCH (n) where id(n) in [2437183, 18766, 2460290, 371947, 9350, 2437735, 1150073] return n",
    searchText: "",
    data: {},
    dataText: "",
    visibleGraph: Immutable.fromJS({nodes: {}, edges: {}}),
    invisibleGraph: Immutable.fromJS({nodes: {}, edges: {}})
  }

  handleGoClick = () => {
    this.executeQuery(this.state.cypherQuery)
  }

  handleSearchClick = () => {
    let query = "CALL db.index.fulltext.queryNodes(" + this.state.searchText + ") YIELD node RETURN node"
    this.executeQuery(query)
  }

  executeQuery = (cypherQuery) => {
    const session = this.driver.session()
    session
      .run(cypherQuery)
      .then(result => {
        let updatedVisibleGraph = this.toGraph(result, this.state.visibleGraph.toJS())
        const paramIDs = Object.keys(updatedVisibleGraph.nodes).toString()
        console.log('INVISIBLE GRAPH')
        this.updateInvisible(paramIDs, updatedVisibleGraph, this.state.invisibleGraph.toJS()) 
        console.log(paramIDs)
        console.log(this.state.visibleGraph.toJS())
        console.log(this.state.invisibleGraph.toJS())

      })
      .catch(error => {
        console.log(error)
      })
      .then(() => session.close())

  }

  updateInvisible = (paramIDs, updatedVisibleGraph, invisibleGraph) => {
    const invisibleSession = this.driver.session()
    invisibleSession
      .run("MATCH (n)-[r]-(b) WHERE ID(n) in ["+ paramIDs +"] RETURN n, r, b")
      .then(result => {
        const updatedInvisibleGraph = this.toGraph(result,
          invisibleGraph)
        updatedVisibleGraph = this.reconcileGraphs(updatedVisibleGraph,
          updatedInvisibleGraph)
        this.setState({
          visibleGraph: Immutable.fromJS(updatedVisibleGraph),
          invisibleGraph: Immutable.fromJS(updatedInvisibleGraph)
        })

      })
  }

  handleCypherQueryTextChange = (event) => {
    this.setState({cypherQuery: event.target.value})
  }

  handleSearchTextChange = (event) => {
    this.setState({searchText: event.target.value})
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
    console.log(graph)
    return graph;
  }

  reconcileGraphs = (vGraph, iGraph) => {
    console.log('before reconcile')
    console.log('visible nodes: ' + Object.keys(vGraph.nodes).length)
    console.log('visible edges: ' + Object.keys(vGraph.edges).length)
    console.log('invisible nodes: ' + Object.keys(iGraph.nodes).length)
    console.log('invisible edges: ' + Object.keys(iGraph.edges).length)
    Object.keys(iGraph.edges).forEach((key) => {
      if (Object.keys(vGraph.nodes).includes(iGraph.edges[key].source.toString()) &&
      Object.keys(vGraph.nodes).includes(iGraph.edges[key].target.toString())) {
        vGraph.edges[key] = iGraph.edges[key]
      }
    })
    console.log('after reconcile')
    console.log('visible nodes: ' + Object.keys(vGraph.nodes).length)
    console.log('visible edges: ' + Object.keys(vGraph.edges).length)
    console.log('invisible nodes: ' + Object.keys(iGraph.nodes).length)
    console.log('invisible edges: ' + Object.keys(iGraph.edges).length)
    return vGraph
  }

  mergeGraphs = (ids, vGraph, iGraph) => {
    console.log('merge graphs')
    ids.forEach((id) => {
      vGraph.edges[id] = iGraph.edges[id]
      vGraph.nodes[vGraph.edges[id].source.id] = iGraph.nodes[iGraph.edges[id].source.id] 
      vGraph.nodes[vGraph.edges[id].target.id] = iGraph.nodes[iGraph.edges[id].target.id] 
    })
    console.log('reconcile after merge')
    console.log('visible graph before')
    console.log(this.state.visibleGraph.toJS())
    console.log('visible graph after merge')
    console.log(vGraph)
    console.log('first reconcile')
    let updatedVisibleGraph = this.reconcileGraphs(vGraph, iGraph)
    console.log('update invisible')
    this.updateInvisible(ids, updatedVisibleGraph, this.state.invisibleGraph.toJS())
    console.log('second reconcile')
    updatedVisibleGraph = this.reconcileGraphs(updatedVisibleGraph, this.state.invisibleGraph.toJS())
    console.log('visible graph after')
    console.log(updatedVisibleGraph)
    return updatedVisibleGraph
  }

  handleButtonClick = (ids) => {
    console.log('button clicked')
    const updatedVisibleGraph = this.mergeGraphs(ids, this.state.visibleGraph.toJS(), this.state.invisibleGraph.toJS())
    this.setState({visibleGraph: Immutable.fromJS(updatedVisibleGraph)})
  }

  render() {
    let graph = null
    console.log(Object.keys(this.state.visibleGraph.toJS().nodes).length)
    if (Object.keys(this.state.visibleGraph.toJS().nodes).length !== 0) {
      graph = <MGraph 
        onButtonClick={this.handleButtonClick}
        visibleGraph={this.state.visibleGraph}
        invisibleGraph={this.state.invisibleGraph}/>
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
        <TextField id="search"
                   label="Search"
                   onChange={this.handleSearchTextChange}
        />
        <Button variant="contained"
                onClick={this.handleSearchClick}>Search</Button>
        {graph}
      </div>
    );
  }
}

export default App;
