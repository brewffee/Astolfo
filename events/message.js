module.exports = (client, message) => {
	const { prefix } = require('../config/config.json'),
		// { con } = require('../config/language.json'),
		msg = message.content,
		args = msg.slice(prefix.length).trim().split(/ +/g),
		commandName = args.shift().toLowerCase(),
		command = client.commandMap.get(commandName);
	if (message.author.bot || msg.indexOf(prefix) !== 0 || !command) return;
	// Debug purposes only
	// if (args.join(' ').length < 1) {
	// 	console.log(`${con.R}Request: "${commandName}"`);
	// } else {
	// 	console.log(`${con.R}Request: "${commandName}", "${args.join(' ')}"`);
	// }
	command.run(client, message, args);
  };