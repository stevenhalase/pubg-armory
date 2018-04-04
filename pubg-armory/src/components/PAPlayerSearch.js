import React, { Component } from 'react';
import Ionicon from 'react-ionicons';

const style = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

const searchStyle = {
  height: '50px',
  padding: '10px',
  fontFamily: "'Roboto', sans-serif",
  fontSize: '24px',
  border: 'none'
}

const invalidSearchStyle = {
  height: '50px',
  padding: '10px',
  fontFamily: "'Roboto', sans-serif",
  fontSize: '24px',
  border: '2px solid #e74c3c'
}

const buttonStyle = {
  height: '50px',
  width: '50px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#FFF',
  backgroundColor: '#f2a900',
  cursor: 'pointer',
  border: 'none'
}

class PAPlayerSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invalid: false
    }

    this.searchPlayer = this.searchPlayer.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.validateInput = this.validateInput.bind(this);
  }
  render() {
    let invalid = this.state.invalid;
    return (
      <div className="PAPlayerSearch" style={style}>
        <input id="pa-player-search" type="text" onChange={this.handleInputChange} style={invalid ? invalidSearchStyle : searchStyle}></input>
        <button style={buttonStyle} onClick={this.searchPlayer}>
          <Ionicon 
            icon="ios-search" 
            color="#FFF" 
            fontSize="24px" />
        </button>
      </div>
    );
  }
  searchPlayer() {
    let playerInput = document.getElementById('pa-player-search');
    this.validateInput(playerInput, () => {
      if (!this.state.invalid) {
        this.props.searchplayer(playerInput.value);
      }
    });
  }
  handleInputChange() {
    let playerInput = document.getElementById('pa-player-search');
    this.validateInput(playerInput);
  }
  validateInput(playerInput, callback) {
    callback = typeof callback === 'undefined' || typeof callback === 'object' ? function(){} : callback;
    playerInput.value.length > 0 ? this.setState({ invalid: false }, callback) : this.setState({ invalid: true }, callback);
  }
}

export default PAPlayerSearch;
