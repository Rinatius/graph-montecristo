import React, { Component } from 'react';

import neo4j from 'neo4j-driver'
import Immutable from 'immutable'

import './my-svg.svg'
import MGraph from "../MGraph/MGraph";
import * as gh from './graphHelpers.js'

import CircularProgress from '@material-ui/core/CircularProgress';

class GraphComponent extends Component{

  driver = neo4j.driver('bolt://neo4j.kloop.io:7687')

  state = {
    visibleGraph: Immutable.fromJS({nodes: {}, edges: {}}),
    invisibleGraph: Immutable.fromJS({nodes: {}, edges: {}}),
    cardNodeIds: Immutable.fromJS([9350, 18766, 371947]),
    showSpinner: false,
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
    this.setState({showSpinner: true})
    const session = this.driver.session()
    session
      .run(cypherQuery)
      .then(result => {
        let updatedVisibleGraph = gh.toGraph(result, this.state.visibleGraph.toJS())
        const paramIDs = Object.keys(updatedVisibleGraph.nodes).toString()
        this.setState({
          visibleGraph: Immutable.fromJS(updatedVisibleGraph)
        })
        this.updateInvisible(paramIDs, updatedVisibleGraph, this.state.invisibleGraph.toJS()) 
      })
      .catch(error => {
        console.log(error)
      })
      .then(() => {
        session.close()
        this.setState({showSpinner: false})
      })

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
      vGraph.nodes[vGraph.edges[id].source] = iGraph.nodes[iGraph.edges[id].source] 
      vGraph.nodes[vGraph.edges[id].target] = iGraph.nodes[iGraph.edges[id].target] 
    })
    let updatedVisibleGraph = gh.reconcileGraphs(vGraph, iGraph)
    this.updateInvisible(ids, updatedVisibleGraph, this.state.invisibleGraph.toJS())
    updatedVisibleGraph = gh.reconcileGraphs(updatedVisibleGraph, this.state.invisibleGraph.toJS())
    return updatedVisibleGraph
  }

  findNodes(nodes, edges, edgeIds) {
    const foundNodes = {} 
    Object.keys(nodes).forEach(nodeKey => {
      edgeIds.forEach(edgeId => {
        if (nodes[nodeKey].id === edges[edgeId].source || nodes[nodeKey].id === edges[edgeId].target){
          foundNodes[nodeKey] = nodes[nodeKey]
        }
      })
    }) 
    return foundNodes
  }

  removeElements = (ids, vGraph, iGraph) => {
    const innocentNodes = this.findNodes(vGraph.nodes, vGraph.edges, ids)
    ids.forEach((id) => {
      let nodeToRemove = vGraph.nodes[vGraph.edges[id].target]
      if (!Object.keys(innocentNodes).includes(String(nodeToRemove.id))){
        delete vGraph.nodes[vGraph.edges[id].target]
        delete vGraph.edges[id]
      }
      // delete iGraph.nodes[iGraph.edges[id].source]
      // delete iGraph.nodes[iGraph.edges[id].target]
      // delete iGraph.edges[id]
    })
    return [vGraph, iGraph]
  }

  handleButtonClick = (ids) => {
    const edges = Object.keys(this.state.visibleGraph.toJS().edges)
    let visibleGraph = this.state.visibleGraph.toJS()
    let invisibleGraph = this.state.invisibleGraph.toJS()
    let updatedVisibleGraph = null
    // if ids are already in visible graph
    if (ids.every(el => edges.includes(el))) {
      const graphs = this.removeElements(ids, visibleGraph, invisibleGraph)
      updatedVisibleGraph = graphs[0]
      ids = edges.filter(el => !ids.includes(el))
    } else {
      updatedVisibleGraph = this.mergeGraphs(ids, visibleGraph, invisibleGraph)
    }
    const nodes = this.findNodes(updatedVisibleGraph.nodes, updatedVisibleGraph.edges, ids)
    this.setState({visibleGraph: Immutable.fromJS(updatedVisibleGraph)})
    this.updateInvisible(Object.keys(nodes), updatedVisibleGraph, invisibleGraph)
  }

  removeFromArray = (nodeId) => {
    let cardNodeIds = this.state.cardNodeIds.toJS()
    const idIndex = cardNodeIds.indexOf(parseInt(nodeId))
    if (idIndex > -1) {
      cardNodeIds.splice(idIndex, 1)
    }
    return cardNodeIds
  }

  addToArray = (nodeId) => {
    let cardNodeIds = this.state.cardNodeIds.toJS()
    const idIndex = cardNodeIds.indexOf(parseInt(nodeId))
    if (idIndex === -1) {
      cardNodeIds.push(parseInt(nodeId))
    }
    return cardNodeIds
  }

  handleMinimezeClick = (nodeId) => {
    console.log('minimize clicked', nodeId)
    const cardNodeIds = this.removeFromArray(nodeId)
    console.log('card nodes after minimize: ', cardNodeIds)
    this.setState({cardNodeIds: Immutable.fromJS(cardNodeIds)})
  }

  handleNodeClick = (nodeId) => {
    console.log('node clicked', nodeId)
    console.log(parseInt(nodeId))
    console.log(this.state.cardNodeIds.toJS())
    console.log(!this.state.cardNodeIds.toJS().includes(parseInt(nodeId)))
    if (!this.state.cardNodeIds.toJS().includes(parseInt(nodeId))){
      const cardNodeIds = this.addToArray(nodeId)
      this.setState({cardNodeIds: Immutable.fromJS(cardNodeIds)})
    } else {
      console.log('doing nothing')
    }
  }

  returnSpinner = () => {
    return (
    <div style = {{
      position: 'absolute',
      height: '100px',
      width: '100px',
      top: '50%',
      left: '50%',
      marginLeft: '-50px',
      marginTop: '-50px',
      }}>
      <CircularProgress size={100} style={{color: 'grey'}}/>
    </div>
    )
  }

  render() {
    let graph = null
    if (Object.keys(this.state.visibleGraph.toJS().nodes).length !== 0) {
      graph = <MGraph 
        onButtonClick={this.handleButtonClick}
        onMinimizeClick={this.handleMinimezeClick}
        onNodeClick={this.handleNodeClick}
        visibleGraph={this.state.visibleGraph}
        invisibleGraph={this.state.invisibleGraph}
        cardNodeIds={this.state.cardNodeIds}/>
    }
    return(
      <div>
        {this.state.showSpinner ? this.returnSpinner() : graph}
        {/* {graph} */}
      </div>
    )
  }

}

export default GraphComponent