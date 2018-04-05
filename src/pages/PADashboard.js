import React, { Component } from 'react';
import PANavigation from '../components/PANavigation';
import PAPlayerSearch from '../components/PAPlayerSearch';
import PAMatches from '../components/PAMatches';
import PAMatchDetail from '../components/PAMatchDetail';

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
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <div className="PADashboard" style={style}>
        <PANavigation />
        <div style={playerSearchWrapper}>
          <PAPlayerSearch 
            selectedregion={this.props.selectedregion}
            searchplayer={this.props.searchplayer}
            selectregion={this.props.selectregion}/>
        </div>
        <PAMatches player={this.props.player} 
          selectedmatch={this.props.selectedmatch} 
          openmatch={this.props.openmatch} 
          downloadmatch={this.props.downloadmatch} />
        <PAMatchDetail player={this.props.player} selectedmatch={this.props.selectedmatch} />
      </div>
    );
  }
}

export default PADashboard;
