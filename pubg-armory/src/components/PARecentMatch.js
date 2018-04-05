import React, { Component } from 'react';

const style = {
  
}

class PARecentMatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: this.props.player,
      matchPlayer: null,
      match: this.props.latestmatch,
      team: null
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      player: nextProps.player,
      matchPlayer: null,
      match: nextProps.latestmatch,
      team: null
    })
  }
  render() {
    return (
      <div className="PARecentMatch" style={style}>

      </div>
    );
  }
}

export default PARecentMatch;
