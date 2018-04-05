export default class MatchDTO {
    constructor(options = {}) {
      this.id = options.id || '';
      this.attributes = options.attributes || {};
      this.rosters = options.rosters || [];
      this.team = options.team || {};
      this.matchPlayer = options.matchPlayer || {};
    }
  }