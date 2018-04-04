import React, { Component } from 'react';

const style = {
  
}

class PARecentMatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: this.props.player,
      matchPlayer: null,
      match: this.props.player.matches[0],
      team: null
    }

    this.getTeamFromRosters = this.getTeamFromRosters.bind(this);

    this.getTeamFromRosters(this.state.match.rosters);
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      player: nextProps.player,
      matchPlayer: null,
      match: nextProps.match,
      team: null
    }, () => {
      this.getTeamFromRosters(this.state.match.rosters);
    })
  }
  render() {
    return (
      <div className="PARecentMatch" style={style}>

      </div>
    );
  }
  getTeamFromRosters(rosters) {
    let matchPlayer = null;
    let team = rosters.filter((roster, i) => {
      let playerIndex = roster.participants.findIndex(player => {
        return player.id === this.state.player.id;
      });
      let isInRoster = playerIndex >= 0;
      if (isInRoster) {
        matchPlayer = roster.participants[playerIndex];
      }
      return isInRoster;
    });
    
    this.setState({ matchPlayer, team });
  }
}

export default PARecentMatch;
