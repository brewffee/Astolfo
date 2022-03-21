module.exports = (client) => {
  const config = require('../config/config.json'),
    Discord = require('discord.js');
  client.user.setActivity('Fate', {
    type: 'WATCHING',
  });
  client.guilds.cache.get('761203866732724225').channels.cache.get('787087630390919228').send(
      new Discord.MessageEmbed()
        .setTitle('Astolfo is online!')
        .setDescription(`Listening on ${client.guilds.cache.size} guilds!`)
        .setColor('GREEN')
        .setFooter(config.version),
    );
  console.log(`\x1b[32;10m[ OK ] \x1b[0m${config.version} is ready!`);
  console.log(`\x1b[32;10m[ OK ] \x1b[0mListening on \x1b[33;10m${client.guilds.cache.size}\x1b[0m guilds!\n===========================================`);
};