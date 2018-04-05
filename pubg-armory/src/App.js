import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import APIService from './services/APIService';
import PADashboard from './pages/PADashboard';
import PAPageContainer from './components/PAPageContainer';

import './App.css';
import PlayerDTO from './dto/PlayerDTO';
import MatchDTO from './dto/MatchDTO';
import Processor from './helpers/Processor';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      APIService: new APIService(),
      selectedRegion: 'pc-na',
      player: null,
      selectedMatch: null
    }

    this.handlePlayerSearch = this.handlePlayerSearch.bind(this);
    this.openMatch = this.openMatch.bind(this);
    this.downloadMatch = this.downloadMatch.bind(this);
    this.selectRegion = this.selectRegion.bind(this);
  }
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' 
            render={(props) => (
              <PAPageContainer>
                <PADashboard 
                  player={this.state.player}
                  selectedmatch={this.state.selectedMatch}
                  selectedregion={this.state.selectedRegion}
                  apiservice={this.state.APIService}
                  searchplayer={this.handlePlayerSearch}
                  openmatch={this.openMatch}
                  downloadmatch={this.downloadMatch}
                  selectregion={this.selectRegion} />
              </PAPageContainer>
            )}/>
        </Switch>
      </div>
    );
  }
  handlePlayerSearch(playerName) {
    console.log(playerName)
    this.state.APIService.getPlayer(playerName, this.state.selectedRegion)
      .then(response => {
        let player = new PlayerDTO(response.data);
        player = Processor.processPlayer(player);
        let selectedMatch = new MatchDTO(player.matches[0]);
        this.setState({ player, selectedMatch });
      })
      .catch(error => {
        console.log(error);
      })
  }
  openMatch(matchId) {
    let selectedMatch = this.state.player.matches.find(match => {
      return match.id === matchId;
    });
    this.setState({ selectedMatch });
  }
  downloadMatch(matchId) {
    let selectedMatchIndex = this.state.player.matches.findIndex(match => {
      return match.id === matchId;
    });
    this.state.APIService.getMatch(matchId, this.state.selectedRegion)
      .then(response => {
        let statePlayer = this.state.player;
        let match = new MatchDTO(response.data);
        match = Processor.processMatch(this.state.player, match);
        statePlayer.matches[selectedMatchIndex] = match;
        
        this.setState({ player: statePlayer, selectedMatch: match });
      })
      .catch(error => {
        console.log(error);
      })
  }
  selectRegion(regionId) {
    this.setState({ selectedRegion: regionId });
  }
}

export default App;
