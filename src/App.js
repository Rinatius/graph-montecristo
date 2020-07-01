import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import './App.css';
import TextField from '@material-ui/core/TextField';
import './my-svg.svg'
import GraphComponent from './components/GraphComponent'
import Pagination from '@material-ui/lab/Pagination';
import queryString from 'query-string'
import Sidebar from './SideBar/SideBar';

const axios = require('axios').default;


class App extends Component {

  state = {
    cypherQuery: "MATCH (n) where id(n) in [2437183, 18766, 2460290, 371947, 9350, 2437735, 1150073] return n",
    goClick: false,
    clearGraph: false,
    listOfNodes: [],
    showPagination: false
  }

  componentDidMount() { 
    let urlString =  queryString.parse(window.location.search, {decode: false})
    let query = ''
    console.log("URL STRING", urlString)
    if (urlString.nodes) {
      query = "MATCH (n) where id(n) in [" + urlString.nodes + "] return n"
      console.log("NODES", query)
      this.setState({cypherQuery: query})
      // this.handleGoClick()
    }
    else if (urlString.url) {
      console.log("urlString", urlString)
      this.fetchData(urlString)
    }
  }

  handleCypherQueryTextChange = (event) => {
    this.setState({cypherQuery: event.target.value})
  }

  handleSearchTextChange = (event) => {
    this.setState({searchText: event.target.value})
  }

  handlePaginationChange = (event, value) => {

    this.handleClearClick()
    let nodes = this.state.listOfNodes[value - 1]
    let query = "MATCH (n) where id(n) in [" + nodes.join() + "] return n"
    this.setState({cypherQuery: query})
    this.handleGoClick()

  }

  fetchData = (urlString) => {
    axios.get(urlString.url, {
      params: {
        token: urlString.token
      }
    })
    .then(response => {
      // handle success
      console.log(response);
      let query = "MATCH (n) where id(n) in [" + response.data[0].join() + "] return n"
      console.log(query)
      this.setState({listOfNodes: response.data, showPagination: true, cypherQuery: query})
    })
    .catch(error => {
      // handle error
      console.log('There has been a problem with your fetch operation: ' + error.message);
    })
  }

  handleGoClick = () => {
    this.setState({goClick: true});
    console.log('go button clicked')
    console.log('state goClicked ', this.state.goClick)
  }

  goClick = () => {
    this.setState({goClick: false})
  }

  handleClearClick = () => {
    this.setState({clearGraph: true})
  }

  clearClick = () => {
    this.setState({clearGraph: false})
  }

  render() {
    return(
      <div className='App'>
        <Sidebar 
         value={this.state.cypherQuery}
         onChange={this.handleCypherQueryTextChange}
         cypherQuery={this.state.cypherQuery}
         goButtonClicked={this.handleGoClick}/>
        <TextField id="query"
                   label="Query"
                   value={this.state.cypherQuery}
                   onChange={this.handleCypherQueryTextChange}
        />
        <Button variant="contained"
                onClick={this.handleGoClick}>Go</Button>
        <Button variant="contained"
                onClick={this.handleClearClick}>Clear</Button>
        <GraphComponent 
          cypherQuery={this.state.cypherQuery}
          isGoClick={this.state.goClick}
          goClick={this.goClick}
          isClearGraph={this.state.clearGraph}
          clearClick={this.clearClick}/>
        {this.state.showPagination? <Pagination count={this.state.listOfNodes.length} onChange={this.handlePaginationChange} showFirstButton showLastButton /> : null}
      </div>
    )
  }
}

export default App;
