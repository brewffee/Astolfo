'use strict';

const { Client, Collection, MessageEmbed } = require('discord.js'),
  { con, ev, net } = require('./config/language.json'),
  config = require('./config/config.json'),
  locate = require('fs').readdir,
  client = new Client();
client.cmds = new Collection();
require('dotenv').config();

// EVENTS =================================================
locate('./events/', (err, events) => {
  try {
    events.forEach((eventFile) => {
      const event = require(`./events/${eventFile}`),
        clientEvent = eventFile.split('.')[0];
      if (clientEvent.startsWith(config.disablePrefix)) return;
      try {
        client.on(clientEvent, event.bind(null, client));
        console.log(`${con.OK}Loaded event ${clientEvent.toUpperCase()}!`);
      } catch {
        return console.log(`${con.ERR}Failed to load event ${clientEvent.toUpperCase()}!`);
      }
    });
  } catch {
    console.log(err);
    return process.exit();
  }
});

// DEBUG ==================================================
if (config.debug) {
  // Creating event files for debug mode is less convenient
  client.on('debug', console.log).on('warn', console.log);
}

// COMMANDS ===============================================

locate('./commands/', (err, groupDir) => {
  try {
    groupDir.forEach((group) => {
      locate(`./commands/${group}`, (err, commands) => {
        try {
          commands.forEach((file) => {
            if (!file.endsWith('.js') || file.startsWith(config.disablePrefix)) return;
            const command = file.split('.')[0];
            try {
              client.cmds.set(command, require(`./commands/${group}/${file}`));
              console.log(`${con.OK}Loaded command ${group.toUpperCase()}:${command.toUpperCase()}!`);
            } catch {
              return console.log(`${con.ERR}failed to load command ${command.toUpperCase()}`);
            }
          });
        } catch {
          console.log(err);
          return process.exit();
        }
      });
    });
  } catch {
    console.log(err);
    return process.exit();
  }
});

// CONSOLE ===============================================
console.log(`${con.INFO}Finishing...`);
process.on('SIGINT', async () => {
  console.log(`${con.LINE}${con.STOP}${ev.stopping}`);
  client.guilds.cache.get('761203866732724225').channels.cache.get('787087630390919228').send(
    new MessageEmbed()
      .setTitle('Astolfo is shutting down...')
      .setDescription('Preparing to disconnect')
      .setColor('RED')
      .setFooter(config.version),
  );
  setTimeout(async () => {
    client.destroy();
    console.log(`${con.OK}${net.disconnected}`);
    process.exit(0);
  }, 1000);
}).on('exit', () => {
  console.log(`${con.OK}${ev.stopped}`);
});

client.login(process.env.TOKEN);