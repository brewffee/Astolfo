module.exports.run = async (message, args) => {
  require('../../util/Errors.js').throw(args[0], message.channel);
};