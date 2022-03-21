'use strict';

const { Client, Collection } = require('discord.js'),
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
console.log(`[ INFO ] Finishing...`);
process.on('SIGINT', () => {
  client.emit('shutdown');
  setTimeout(() => {
    console.log('Unable to shut down, forcibly closing process.');
    process.exit();
  }, 10e3);
})

client.login(process.env.TOKEN);