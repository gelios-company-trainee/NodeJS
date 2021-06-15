
const file = __dirname;

module.exports.info = (msg) => {
  console.log(`Info - ${msg} - ${file}`);
};

module.exports.error = (msg) => {
  console.log(`Error - ${msg} - ${file}`);
};