'use strict';

const Discord = require('discord.js'),
	Map = require('enmap'),
	auth = require('./auth/auth.json'),
	{ con, ev, net } = require('./config/language.json'),
	config = require('./config/config.json'),
	fs = require('fs'),
	client = new Discord.Client();

// EVENTS =================================================
fs.readdir('./events/', (err, events) => {
	if (err) {
		console.log(`${con.ERR}Reading event directory failed: ${err.toString().substr(15)}`);
		return process.exit();
	}
	events.forEach(eventFile => {
		const event = require(`./events/${eventFile}`),
			clientEvent = eventFile.split('.')[0];
		if (clientEvent.startsWith(config.disablePrefix)) return;
		try {
			client.on(clientEvent, event.bind(null, client));
			setTimeout(() => { console.log(`${con.OK}Loaded event ${clientEvent.toUpperCase()}!`); }, 1000);
		} catch { 
			return setTimeout(() => { console.log(`${con.ERR}Failed to load event ${clientEvent.toUpperCase()}!`); }, 1000); 
		}
	});
});

// DEBUG ==================================================
if (config.debug) {
	// Creating event files for debug mode is less convenient
	client.on('debug', console.log)
		.on('warn', console.log);
}

// COMMANDS ===============================================
client.commandMap = new Map();

fs.readdir('./commands/', (err, groupDir) => {
	if (err) {
		console.log(`${con.ERR}Reading command directory failed: ${err.toString().substr(15)}`);
		return process.exit();
	}
	groupDir.forEach(group => {
		fs.readdir(`./commands/${group}`, (err, commands) => {
			if (err) {
				console.log(`${con.ERR}Failed to load module ${group.toUpperCase()}: ${err.toString().substr(15)}`);
				return process.exit();
			}
			commands.forEach(file => {
				if (!file.endsWith('.js') || file.startsWith(config.disablePrefix)) return;
				const command = file.split('.')[0];
				try {
					client.commandMap.set(command, require(`./commands/${group}/${file}`));
					setTimeout(() => { console.log(`${con.OK}Loaded command ${group.toUpperCase()}:${command.toUpperCase()}!`); }, 3000);
				} catch { 
					return setTimeout(() => { console.log(`${con.ERR}failed to load command ${command.toUpperCase()}`); }, 3000); 
				}
			});
		});
	});
});

// CONSOLE ===============================================
setTimeout(() => { console.log(`${con.INFO}Finishing...`); }, 3500);
process.on('SIGINT', async() => {
	const Discord = require('discord.js');
	console.log(`${con.LINE}${con.STOP}${ev.stopping}`);
	client.guilds.cache.get('761203866732724225').channels.cache.get('787087630390919228').send(
        new Discord.MessageEmbed().setTitle('Astolfo is shutting down...').setDescription(`Preparing to disconnect`).setColor('RED').setFooter(config.version)
    );
	setTimeout(() => { client.destroy(); console.log(`${con.OK}${net.disconnected}`); }, 700);
	setTimeout(() => { process.exit(0); }, 701);
}).on('exit', () => {
	console.log(`${con.OK}${ev.stopped}`);
});

client.login(auth.discord.token);