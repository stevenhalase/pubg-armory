import React, { Component } from 'react';
import Ionicon from 'react-ionicons';

const style = {
  position: 'relative',
  maxHeight: '250px',
  width: '70%',
  paddingBottom: '50px',
  overflow: 'hidden'
}

const expandedStyle = {
  position: 'relative',
  height: 'auto',
  width: '70%',
  paddingBottom: '50px'
}

const tableStyle = {
  width: '100%',
  border: '1px solid rgba(255,255,255,.2)',
  fontFamily: "'Roboto', sans-serif",
  color: '#FFF'
}

const selectedMatch = {
  border: '1px solid #f2a900'
}

const notSelectedMatch = {
  border: '1px solid red'
}

const headerRowItem = {
  padding: '15px',
  color: '#f2a900',
  backgroundColor: 'rgba(0,0,0,0.1)',
  textAlign: 'center'
}

const evenRowItem = {
  padding: '15px',
  fontSize: '12px',
  backgroundColor: 'rgba(0,0,0,0.4)',
  textAlign: 'center'
}

const oddRowItem = {
  padding: '15px',
  fontSize: '12px',
  backgroundColor: 'rgba(0,0,0,0.8)',
  textAlign: 'center'
}

const actionIcon = {
  cursor: 'pointer'
}

const expander = {
  width: '100%',
  height: '50px',
  position: 'absolute',
  bottom: '0',
  backgroundColor: '#000',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: '1px solid rgba(255,255,255,.2)',
  cursor: 'pointer'
}

class PAMatches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    }

    this.toggleExpandMatches = this.toggleExpandMatches.bind(this);
    this.openMatch = this.openMatch.bind(this);
    this.downloadMatch = this.downloadMatch.bind(this);
  }
  render() {
    if (this.props.player && this.props.player.matches) {
      return (
        <div className="PAMatches" style={this.state.expanded ? expandedStyle : style}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={headerRowItem}>
                </th>
                <th style={headerRowItem}>
                  Match Date
                </th>
                <th style={headerRowItem}>
                  Match ID
                </th>
              </tr>
            </thead>
            <tbody>
              {this.props.player.matches.map((match, i) => {
                return(
                  <tr key={i} 
                    style={this.props.selectedmatch.id === match.id ?
                      selectedMatch : notSelectedMatch}>
                    <td style={i % 2 === 0 ? evenRowItem : oddRowItem} data-match-id={match.id}>
                      {match.attributes ? 
                        <Ionicon 
                          icon="ios-eye-outline" 
                          color="#FFF" 
                          fontSize="16px"
                          style={actionIcon}
                          onClick={this.openMatch} /> : 
                        <Ionicon 
                          icon="ios-download-outline" 
                          color="#FFF" 
                          fontSize="16px"
                          style={actionIcon}
                          onClick={this.downloadMatch} />}
                    </td>
                    <td style={i % 2 === 0 ? evenRowItem : oddRowItem}>
                      {match.attributes ? 
                        new Date(match.attributes.createdAt).toLocaleString() : ''}
                    </td>
                    <td style={i % 2 === 0 ? evenRowItem : oddRowItem}>
                      {match.id}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <div style={expander} onClick={this.toggleExpandMatches}>
            <Ionicon 
              icon="ios-more" 
              color="#FFF" 
              fontSize="32px" />
          </div>
        </div>
      );
    } else {
      return (
        <div className="PAMatches" style={style}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={headerRowItem}>
                </th>
                <th style={headerRowItem}>
                  Match Date
                </th>
                <th style={headerRowItem}>
                  Match ID
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="3" style={oddRowItem}>
                  No Matches Loaded
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
  }
  toggleExpandMatches(e) {
    this.setState({ expanded: !this.state.expanded });
  }
  openMatch(e) {
    let matchId = e.target.parentElement.dataset.matchId;
    this.props.openmatch(matchId)
  }
  downloadMatch(e) {
    let matchId = e.target.parentElement.dataset.matchId;
    this.props.downloadmatch(matchId)
  }
}

export default PAMatches;
