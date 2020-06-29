import React, { Component } from 'react';

import neo4j from 'neo4j-driver'
import Immutable from 'immutable'

import './my-svg.svg'
import MGraph from "../MGraph/MGraph";
import * as gh from './graphHelpers.js'

class GraphComponent extends Component{

  driver = neo4j.driver('bolt://neo4j.kloop.io:7687')

  state = {
    visibleGraph: Immutable.fromJS({nodes: {}, edges: {}}),
    invisibleGraph: Immutable.fromJS({nodes: {}, edges: {}})
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isGoClick !== this.props.isGoClick) {
      this.goClick(this.props.cypherQuery)
      this.props.goClick()
    }
    if (prevProps.isClearGraph !== this.props.isClearGraph) {
      this.clearGraphs()
      this.props.clearClick()
    }
  }

  clearGraphs = () => {
    this.setState({visibleGraph: Immutable.fromJS({nodes: {}, edges: {}}),
                   invisibleGraph: Immutable.fromJS({nodes: {}, edges: {}})})
  }

  goClick = (query) => {
    this.executeQuery(query)
  }

  executeQuery = (cypherQuery) => {
    const session = this.driver.session()
    session
      .run(cypherQuery)
      .then(result => {
        let updatedVisibleGraph = gh.toGraph(result, this.state.visibleGraph.toJS())
        const paramIDs = Object.keys(updatedVisibleGraph.nodes).toString()
        this.updateInvisible(paramIDs, updatedVisibleGraph, this.state.invisibleGraph.toJS()) 
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
        const updatedInvisibleGraph = gh.toGraph(result,
          invisibleGraph)
        updatedVisibleGraph = gh.reconcileGraphs(updatedVisibleGraph,
          updatedInvisibleGraph)
        this.setState({
          visibleGraph: Immutable.fromJS(updatedVisibleGraph),
          invisibleGraph: Immutable.fromJS(updatedInvisibleGraph)
        })

      })
  }

  mergeGraphs = (ids, vGraph, iGraph) => {
    ids.forEach((id) => {
      vGraph.edges[id] = iGraph.edges[id]
      vGraph.nodes[vGraph.edges[id].source.id] = iGraph.nodes[iGraph.edges[id].source.id] 
      vGraph.nodes[vGraph.edges[id].target.id] = iGraph.nodes[iGraph.edges[id].target.id] 
    })
    let updatedVisibleGraph = gh.reconcileGraphs(vGraph, iGraph)
    this.updateInvisible(ids, updatedVisibleGraph, this.state.invisibleGraph.toJS())
    updatedVisibleGraph = gh.reconcileGraphs(updatedVisibleGraph, this.state.invisibleGraph.toJS())
    return updatedVisibleGraph
  }

  handleButtonClick = (ids) => {
    const updatedVisibleGraph = this.mergeGraphs(ids, this.state.visibleGraph.toJS(), this.state.invisibleGraph.toJS())
    this.setState({visibleGraph: Immutable.fromJS(updatedVisibleGraph)})
  }

  render() {
    let graph = null
    if (Object.keys(this.state.visibleGraph.toJS().nodes).length !== 0) {
      graph = <MGraph 
        onButtonClick={this.handleButtonClick}
        visibleGraph={this.state.visibleGraph}
        invisibleGraph={this.state.invisibleGraph}/>
    }
    return(
      <div>
        {graph}
      </div>
    )
  }

}

export default GraphComponent