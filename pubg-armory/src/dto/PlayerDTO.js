export default class PlayerDTO {
  constructor(options) {
    this.id = options.id || '';
    this.attributes = options.attributes || {};
    this.matches = options.matches || [];
  }
}