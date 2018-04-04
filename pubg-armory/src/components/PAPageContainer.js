import React, { Component } from 'react';

const style = {
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',
  overflowY: 'auto'
}

class PAPageContainer extends Component {
  render() {
    return (
      <div className="PAPageContainer" style={style}>
        {this.props.children}
      </div>
    );
  }
}

export default PAPageContainer;