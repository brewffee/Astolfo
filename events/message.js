module.exports = (client, message) => {
	const { prefix } = require('../config/config.json'),
		{ con } = require('../config/language.json'),
		msg = message.content,
		args = msg.slice(prefix.length).trim().split(/ +/g),
		command = args.shift().toLowerCase(),
		cmd = client.commands.get(command);
	if (message.author.bot || msg.indexOf(prefix) !== 0 || !cmd) return;
	console.log(`${con.R}Request: "${command}", "${args.join(' ')}"`);
	cmd.run(client, message, args);
  };