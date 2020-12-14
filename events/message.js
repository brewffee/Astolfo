module.exports = (client, message) => {
	const config = require('../config/config.json'),
		args = message.content.slice(config.prefix.length).trim().split(/ +/g),
		command = client.commandMap.get(args.shift().toLowerCase());
	if (message.author.bot || !message.content.indexOf(config.prefix.toLowerCase()) === 0 || !command) return;

	if (config.debug) {
		const { con } = require('../config/language.json');
		let cmd;
		if (!args[0]) {
			cmd = message.content;
			console.log(`${con.R}Request: "${cmd}"`);
		} else {
			cmd = message.content.substr(0, message.content.indexOf(' '));
			console.log(`${con.R}Request: "${cmd}", "${args.join(' ')}"`);
		}
	}

	command.run(client, message, args);
};