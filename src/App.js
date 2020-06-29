import React, { Component } from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField';
import './my-svg.svg'
import GraphComponent from './components/GraphComponent'
import Pagination from '@material-ui/lab/Pagination';
import Sidebar from './SideBar/SideBar';

let listOfQueries = ["MATCH (n) RETURN n LIMIT 1", "MATCH (n) RETURN n LIMIT 2", "MATCH (n) RETURN n LIMIT 3", "MATCH (n) RETURN n LIMIT 4", "MATCH (n) where id(n) in [2437183, 18766, 2460290, 371947, 9350, 2437735, 1150073] return n"]

class App extends Component {

  state = {
    cypherQuery: "MATCH (n) where id(n) in [2437183, 18766, 2460290, 371947, 9350, 2437735, 1150073] return n",
  }

  handleCypherQueryTextChange = (event) => {
    this.setState({cypherQuery: event.target.value})
  }

  handleSearchTextChange = (event) => {
    this.setState({searchText: event.target.value})
  }

  handlePaginationChange = (event, value) => {
    this.setState({cypherQuery: listOfQueries[value - 1]})
  }


  render() {
    return(
      <div className='App'>
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
