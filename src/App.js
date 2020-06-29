import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import './App.css';
import TextField from '@material-ui/core/TextField';
import './my-svg.svg'
import GraphComponent from './components/GraphComponent'
import Pagination from '@material-ui/lab/Pagination';
import queryString from 'query-string'
import Sidebar from './SideBar/SideBar';

let listOfQueries = ["MATCH (n) RETURN n LIMIT 1", "MATCH (n) RETURN n LIMIT 2", "MATCH (n) RETURN n LIMIT 3", "MATCH (n) RETURN n LIMIT 4", "MATCH (n) where id(n) in [2437183, 18766, 2460290, 371947, 9350, 2437735, 1150073] return n"]

class App extends Component {

  state = {
    cypherQuery: "MATCH (n) where id(n) in [2437183, 18766, 2460290, 371947, 9350, 2437735, 1150073] return n",
    goClick: false,
    clearGraph: false
  }

  componentDidMount() { 
    let urlQuery =  queryString.parse(window.location.search)
    // fetch(urlQuery)
    // .then((response) => {
    //   return response.json();
    // })
    // .then((data) => {
    //   console.log(data);
    // });
  }

  handleCypherQueryTextChange = (event) => {
    this.setState({cypherQuery: event.target.value})
  }

  handleSearchTextChange = (event) => {
    this.setState({searchText: event.target.value})
  }

  handlePaginationChange = (event, value) => {
    this.handleClearClick()
    this.setState({cypherQuery: listOfQueries[value - 1]})
    this.handleGoClick()
  }

  handleGoClick = () => {
    this.setState({goClick: true})
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
        <Sidebar 
         value={this.state.cypherQuery}
         onChange={this.handleCypherQueryTextChange}
         cypherQuery={this.state.cypherQuery}/>
        
        <GraphComponent cypherQuery={this.state.cypherQuery}/>
        <Pagination count={listOfQueries.length} onChange={this.handlePaginationChange} showFirstButton showLastButton />
      </div>
    )
  }
}

export default App;
