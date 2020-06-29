// HOC component for graph-montecristo

import React, { Component } from 'react';
import './App.css';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import neo4j from 'neo4j-driver'
import Immutable from 'immutable'

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

}