import React, { Component } from 'react';
import Ionicon from 'react-ionicons';
import PAPlayerStats from './PAPlayerStats';

const style = {
  width: '70%'
}

const cardStyle = {
  border: '1px solid rgba(255,255,255,.2)',
  fontFamily: "'Roboto', sans-serif",
  color: '#FFF'
}

const cardHeader = {
  padding: '25px',
  fontFamily: "'Oswald', sans-serif",
  borderBottom: '1px solid rgba(255,255,255,.2)',
  color: '#f2a900',
  backgroundColor: 'rgba(0,0,0,0.1)'
}

const cardTitle = {
  margin: '0',
  color: '#f2a900'
}

const cardBody = {
  padding: '25px'
}

const rankContainer = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

const rankPlace = {
  fontSize: '48px',
  margin: '5px'
}

const rankSeparator = {
  margin: '5px'
}

const rankOutOf = {
  margin: '5px'
}

class PAMatchDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: this.props.player,
      match: this.props.selectedmatch,
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      player: nextProps.player,
      match: nextProps.selectedmatch
    })
  }
  render() {
    if (this.state.player && 
        this.state.match && 
        this.state.match.matchPlayer && 
        this.state.match.team && 
        this.state.match.team.length > 0) {
      return (
        <div className="PAMatchDetail" style={style}>
          <div style={cardStyle}>
            <div style={cardHeader}>
              <div style={cardTitle}>Match Stats</div>
            </div>
            <div style={cardBody}>
              <div style={rankContainer}>
                <div style={rankPlace}>{this.state.match.team[0].attributes.stats.rank}</div>
                <div style={rankSeparator}>/</div>
                <div style={rankOutOf}>{this.state.match.rosters.length}</div>
                <div>
                  {this.state.match.team[0].attributes.won === "true" ? 
                    <Ionicon 
                      icon="ios-trophy" 
                      color='#f2a900' 
                      fontSize="36px" /> :
                    <Ionicon 
                      icon="ios-trophy-outline" 
                      color="#CCC" 
                      fontSize="36px" />}
                </div>
              </div>
            </div>
          </div>
          <PAPlayerStats player={this.state.match.matchPlayer} expanded={true} />
          {this.state.match.team[0].participants.map((player, i) => {
            if (player.attributes.stats.playerId !== this.state.match.matchPlayer.attributes.stats.playerId) {
              return(
                <PAPlayerStats player={player} teammate={true} expanded={false} key={i} />
              )
            }
          })}
        </div>
      );
    } else {
      return (
        <div className="PAMatchDetail" style={style}>
          <div style={cardStyle}>
            <div style={cardHeader}>
              <div style={cardTitle}>Match Stats</div>
            </div>
            <div style={cardBody}>

            </div>
          </div>
          <div style={cardStyle}>
            <div style={cardHeader}>
              <div style={cardTitle}>Player Stats</div>
            </div>
            <div style={cardBody}>

            </div>
          </div>
        </div>
      );
    }
  }
}

export default PAMatchDetail;
