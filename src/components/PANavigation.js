import React, { Component } from 'react';
import PALogo from './PALogo';

const style = {
  width: '100%',
  height: '65px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderBottom: '1px solid rgba(255,255,255,.2)'
}

class PANavigation extends Component {
  render() {
    return (
      <div className="PANavigation" style={style}>
        <PALogo />
      </div>
    );
  }
}

export default PANavigation;
