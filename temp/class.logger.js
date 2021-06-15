class Logger {

  constructor() {
    this.file = __dirname;
  }

  info(msg) {
    console.log(`Info -${msg} - ${this.file}`);
  }

  error(msg) {
    console.log(`Error -${msg} - ${this.file}`);
  }
}

module.exports = Logger;