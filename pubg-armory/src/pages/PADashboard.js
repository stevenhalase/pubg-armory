import React, { Component } from 'react';
import PANavigation from '../components/PANavigation';
import PAPlayerSearch from '../components/PAPlayerSearch';
import PAMatches from '../components/PAMatches';
import PARecentMatch from '../components/PARecentMatch';

const style = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
}

const playerSearchWrapper = {
  height: '150px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

class PADashboard extends Component {
  render() {
    return (
      <div className="PADashboard" style={style}>
        <PANavigation />
        <div style={playerSearchWrapper}>
          <PAPlayerSearch searchplayer={this.props.searchplayer}/>
        </div>
        <PAMatches player={this.props.player} />
        <PARecentMatch player={this.props.player} latestmatch={this.props.latestmatch} />
      </div>
    );
  }
}

export default PADashboard;
