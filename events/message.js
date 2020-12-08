module.exports = (client, message) => {
	const { prefix } = require('../config/config.json'),
		// { con } = require('../config/language.json'),
		args = message.content.slice(prefix.length).trim().split(/ +/g),
		command = client.commandMap.get(args.shift().toLowerCase());
	if (message.author.bot || !message.content.indexOf(prefix.toLowerCase()) === 0 || !command) return;
	// Debug purposes only
	// if (args.join(' ').length < 1) {
	// 	console.log(`${con.R}Request: "${args.shift().toLowerCase(),}"`);
	// } else {
	// 	console.log(`${con.R}Request: "${args.shift().toLowerCase(),}", "${args.join(' ')}"`);
	// }
	command.run(client, message, args);
};