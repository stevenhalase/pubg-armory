import axios from 'axios';

export default class APIService {
  constructor() {
    this.base = 'http://localhost:3080/api/v1/';
    this.routes = {
      players: 'players/'
    }
  }

  getPlayer(playerName) {
    return axios.get(`${this.base}${this.routes.players}${playerName}`);
  }
  
}