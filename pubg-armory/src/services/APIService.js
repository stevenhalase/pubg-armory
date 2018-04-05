import axios from 'axios';

export default class APIService {
  constructor() {
    this.base = 'http://localhost:3080/api/v1/';
    this.routes = {
      players: 'players/',
      matches: 'matches/'
    }
  }

  getPlayer(playerName, regionId) {
    return axios.get(`${this.base}${this.routes.players}${regionId}/${playerName}`);
  }

  getMatch(matchId, regionId) {
    return axios.get(`${this.base}${this.routes.matches}${regionId}/${matchId}`);
  }
  
}