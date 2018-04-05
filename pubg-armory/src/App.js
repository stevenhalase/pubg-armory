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
      player: null,
      latestMatch: null
    }
    this.handlePlayerSearch = this.handlePlayerSearch.bind(this);
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
                  latestmatch={this.state.latestMatch}
                  apiservice={this.state.APIService}
                  searchplayer={this.handlePlayerSearch} />
              </PAPageContainer>
            )}/>
        </Switch>
      </div>
    );
  }
  handlePlayerSearch(playerName) {
    console.log(playerName)
    this.state.APIService.getPlayer(playerName)
      .then(response => {
        let player = new PlayerDTO(response.data);
        player = Processor.processPlayer(player);
        let latestMatch = new MatchDTO(player.matches[0]);
        this.setState({ player, latestMatch });
      })
      .catch(error => {
        console.log(error);
      })
  }
}

export default App;
