import React, { Component } from 'react';
import './App.css';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import neo4j from 'neo4j-driver'
import Immutable from 'immutable'

import Pagination from '@material-ui/lab/Pagination';

class App extends Component {

    driver = neo4j.driver('bolt://neo4j.kloop.io:7687')
  
    state = {
      cypherQuery: "MATCH (n) where id(n) in [2437183, 18766, 2460290, 371947, 9350, 2437735, 1150073] return n",
      searchText: "",
      data: {},
      dataText: "",
    }

    handleGoClick = () => {
        this.executeQuery(this.state.cypherQuery)
    }
    
    handleSearchClick = () => {
        let query = "CALL db.index.fulltext.queryNodes(" + this.state.searchText + ") YIELD node RETURN node"
        this.executeQuery(query)
    }

    handleCypherQueryTextChange = (event) => {
      this.setState({cypherQuery: event.target.value})
    }

    handleSearchTextChange = (event) => {
        this.setState({searchText: event.target.value})
    }


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
        <TextField id="search"
                    label="Search"
                    onChange={this.handleSearchTextChange}
        />
        <Button variant="contained"
                onClick={this.handleSearchClick}>Search</Button>
        <Pagination count={11} defaultPage={6} boundaryCount={2} />
        </div>
    );
    }
}

export default App;
