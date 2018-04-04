import React, { Component } from 'react';

const style = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

const logoMain = {
  fontFamily: "'Oswald', sans-serif",
  color: '#f2a900',
  fontSize: '24px',
  margin: '5px'
}

const logoSecondary = {
  fontFamily: "'Oswald', sans-serif",
  color: '#f2a900',
  fontSize: '18px'
}

class PALogo extends Component {
  render() {
    return (
      <div className="PALogo" style={style}>
        <h3 style={logoSecondary}>PUBG</h3>
        <h1 style={logoMain}>ARMORY</h1>
      </div>
    );
  }
}

export default PALogo;
