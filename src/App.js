import React, { Component } from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField';
import './my-svg.svg'
import GraphComponent from './components/GraphComponent'


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


  render() {
    return(
      <div className='App'>
        <TextField id="query"
                   label="Query"
                   value={this.state.cypherQuery}
                   onChange={this.handleCypherQueryTextChange}
        />
        <GraphComponent cypherQuery={this.state.cypherQuery}/>

      </div>
    )
  }
}

export default App;
