module.exports = {
  NotConnectedError: class extends Error {
    constructor(name) {
      super(`${name} is not connected`);
    }
  }
};
