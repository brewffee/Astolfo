'use strict';

const { Client, Collection } = require('discord.js'),
  { con, ev } = require('./config/language.json'),
  config = require('./config/config.json'),
  client = new Client();
client.commands = new Collection();
require('dotenv').config();

// EVENTS =================================================
require('./handlers/Event').load(client);

// DEBUG ==================================================
if (config.debug) {
  client.on('debug', console.log).on('warn', console.log);
}

// COMMANDS ===============================================
require('./handlers/Command').load(client);

// CONSOLE ===============================================
console.log(`${con.INFO}Finishing...`);
process.on('SIGINT', async () => {
  client.emit('shutdown');

}).on('exit', () => {
  console.log(`${con.OK}${ev.stopped}`);
});

client.login(process.env.TOKEN);