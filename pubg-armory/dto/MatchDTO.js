class MatchDTO {
  constructor(options = {}) {
    this.id = options.id || '';
    this.attributes = options.attributes || {};
    this.rosters = options.rosters || [];
  }
}

module.exports = MatchDTO;