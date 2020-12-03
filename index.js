'use strict';

const Discord = require('discord.js'),
	map = require('enmap'),
	auth = require('./auth/auth.json'),
	{ con, event, net } = require('./config/language.json'),
	config = require('./config/config.json'),
	fs = require('fs'),
	client = new Discord.Client();

// EVENTS =================================================
fs.readdir('./events/', (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
		const src = require(`./events/${file}`);
		const eventN = file.split('.')[0];
		try {
			client.on(eventN, src.bind(null, client));
			setTimeout(() => { console.log(`${con.OK}Loaded event ${eventN.toUpperCase()}!`); }, 1000);
		} catch { return setTimeout(() => { console.log(`${con.ERR}Failed to load event ${eventN.toUpperCase()}!`); }, 1000); }
	});
});
// COMMANDS ===============================================
const groupN = [
	'fun',
	'moderation',
	'guild',
	'nsfw',
	'other',
	'admin',
	'info',
];
client.commands = new map();
groupN.forEach(group => {
	fs.readdir(`./commands/${group}`, (err, cmds) => {
		if (err) {
			console.log(`${con.ERR}Failed to load module ${group.toUpperCase()}: ${err.toString().substr(15)}`);
			return process.exit();
		}
		cmds.forEach(file => {
			if (!file.endsWith('.js') || file.startsWith(config.disablePrefix)) return;
			const source = require(`./commands/${group}/${file}`),
				cmdN = file.split('.')[0];
			try {
				client.commands.set(cmdN, source);
				setTimeout(() => { console.log(`${con.OK}Loaded command ${group.toUpperCase()}:${cmdN.toUpperCase()}!`); }, 3000);
			} catch { return setTimeout(() => { console.log(`${con.ERR}failed to load command ${cmdN.toUpperCase()}`); }, 3000); }

		});
	});
});
/*

client.commands = new Enmap();


*/
// CONSOLE ===============================================
setTimeout(() => { console.log(`${con.INFO}Finishing...`); }, 3500);
process.on('SIGINT', () => {
	console.log(`${con.LINE}${con.STOP}${event.stopping}`);
	client.destroy();
	setTimeout(() => { console.log(`${con.OK}${net.disconnected}`); }, 700);
	setTimeout(() => { process.exit(0); }, 701);
})
	.on('exit', () => {
		console.log(`${con.OK}${event.stopped}`);
	});

client.login(auth.discord.token);