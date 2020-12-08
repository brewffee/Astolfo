module.exports = (client, message) => {
	const config = require('../config/config.json'),
		args = message.content.slice(config.prefix.length).trim().split(/ +/g),
		command = client.commandMap.get(args.shift().toLowerCase());
	if (message.author.bot || !message.content.indexOf(config.prefix.toLowerCase()) === 0 || !command) return;

	if (config.debug === true) {
		const { con } = require('../config/language.json');
		if (args.join(' ').length < 1) {
			console.log(`${con.R}Request: "${args.shift().toLowerCase()}"`);
		} else {
			console.log(`${con.R}Request: "${args.shift().toLowerCase()}", "${args.join(' ')}"`);
		}
	}

	command.run(client, message, args);
};