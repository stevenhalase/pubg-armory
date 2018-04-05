import React, { Component } from 'react';
import Ionicon from 'react-ionicons';

const style = {
  position: 'relative',
  maxHeight: '120px',
  paddingBottom: '50px',
  overflow: 'hidden'
}

const expandedStyle = {
  position: 'relative',
  height: 'auto',
  paddingBottom: '50px'
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

const fieldsContainer = {
  display: 'flex',
  flexWrap: 'wrap'
}

const field = {
  flex: '0 0 33%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '15px 0'
}

const fieldLabel = {
  fontSize: '12px',
  color: '#f2a900'
}

const fieldValue = {
  fontSize: '24px',
  fontFamily: "'Roboto', sans-serif"
}

const fieldValueUnit = {
  fontSize: '12px',
  color: '#CCC',
  marginLeft: '5px'
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

class PAPlayerStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: this.props.expanded
    }

    this.toggleExpand = this.toggleExpand.bind(this);
  }
  render() {
    return (
      <div className="PAPlayerStats" style={this.state.expanded ? expandedStyle : style}>
        <div style={cardStyle}>
          <div style={cardHeader}>
            <div style={cardTitle}>{this.props.teammate ? 'Teammate Stats' : 'Player Stats'}</div>
          </div>
          <div style={cardBody}>
            <div style={fieldsContainer}>
              <div style={field}>
                  <div style={fieldLabel}>NAME</div>
                  <div style={fieldValue}>
                    {this.props.player.attributes.stats.name}
                  </div>
              </div>
              <div style={field}>
                  <div style={fieldLabel}>KILLS</div>
                  <div style={fieldValue}>
                    {this.props.player.attributes.stats.kills}
                  </div>
              </div>
              <div style={field}>
                  <div style={fieldLabel}>DBNOs</div>
                  <div style={fieldValue}>
                    {this.props.player.attributes.stats.DBNOs}
                  </div>
              </div>
              <div style={field}>
                  <div style={fieldLabel}>ASSISTS</div>
                  <div style={fieldValue}>
                    {this.props.player.attributes.stats.assists}
                  </div>
              </div>
              <div style={field}>
                  <div style={fieldLabel}>LONGEST KILL</div>
                  <div style={fieldValue}>
                    {(this.props.player.attributes.stats.longestKill).toFixed(2)}
                    <span style={fieldValueUnit}>m</span>
                  </div>
              </div>
              <div style={field}>
                  <div style={fieldLabel}>HEADSHOT KILLS</div>
                  <div style={fieldValue}>
                    {this.props.player.attributes.stats.headshotKills}
                  </div>
              </div>
              <div style={field}>
                  <div style={fieldLabel}>ROAD KILLS</div>
                  <div style={fieldValue}>
                    {this.props.player.attributes.stats.roadKills}
                  </div>
              </div>
              <div style={field}>
                  <div style={fieldLabel}>TEAM KILLS</div>
                  <div style={fieldValue}>
                    {this.props.player.attributes.stats.teamKills}
                  </div>
              </div>
              <div style={field}>
                  <div style={fieldLabel}>HEALS</div>
                  <div style={fieldValue}>
                    {this.props.player.attributes.stats.heals}
                  </div>
              </div>
              <div style={field}>
                  <div style={fieldLabel}>BOOSTS</div>
                  <div style={fieldValue}>
                    {this.props.player.attributes.stats.boosts}
                  </div>
              </div>
              <div style={field}>
                  <div style={fieldLabel}>REVIVES</div>
                  <div style={fieldValue}>
                    {this.props.player.attributes.stats.revives}
                  </div>
              </div>
              <div style={field}>
                  <div style={fieldLabel}>TIME SURVIVED</div>
                  <div style={fieldValue}>
                    {(this.props.player.attributes.stats.timeSurvived/60).toFixed(2)}
                    <span style={fieldValueUnit}>min</span>
                  </div>
              </div>
              <div style={field}>
                  <div style={fieldLabel}>RIDE DISTANCE</div>
                  <div style={fieldValue}>
                    {(this.props.player.attributes.stats.rideDistance).toFixed(2)}
                    <span style={fieldValueUnit}>m</span>
                  </div>
              </div>
              <div style={field}>
                  <div style={fieldLabel}>WALK DISTANCE</div>
                  <div style={fieldValue}>
                    {(this.props.player.attributes.stats.walkDistance).toFixed(2)}
                    <span style={fieldValueUnit}>m</span>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <div style={expander} onClick={this.toggleExpand}>
          <Ionicon 
            icon="ios-more" 
            color="#FFF" 
            fontSize="32px" />
        </div>
      </div>
    );
  }
  toggleExpand(e) {
    this.setState({ expanded: !this.state.expanded });
  }
}

export default PAPlayerStats;
