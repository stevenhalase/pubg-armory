import React, { Component } from 'react';
import Ionicon from 'react-ionicons';

const style = {
  position: 'relative',
  maxHeight: '325px',
  paddingBottom: '50px',
  overflow: 'hidden'
}

const expandedStyle = {
  position: 'relative',
  height: 'auto',
  paddingBottom: '50px'
}

const tableStyle = {
  border: '1px solid rgba(255,255,255,.2)',
  fontFamily: "'Roboto', sans-serif",
  color: '#FFF'
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

const downloadIcon = {
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
  }
  render() {
    if (this.props.player && this.props.player.matches) {
      return (
        <div className="PAMatches" style={this.state.expanded ? expandedStyle : style}>
          <table style={tableStyle}>
            <thead>
              <tr>
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
                  <tr key={i}>
                    <td style={i % 2 === 0 ? evenRowItem : oddRowItem}>
                      {match.attributes ? 
                        new Date(match.attributes.createdAt).toLocaleString() : 
                        <Ionicon 
                          icon="ios-download-outline" 
                          color="#FFF" 
                          fontSize="16px"
                          style={downloadIcon} />}
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
                  Match Date
                </th>
                <th style={headerRowItem}>
                  Match ID
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="2" style={oddRowItem}>
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
}

export default PAMatches;
