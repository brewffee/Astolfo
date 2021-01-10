module.exports = (client) => {
  const config = require('../config/config.json'),
    { con, net, ev } = require('../config/language.json'),
    Discord = require('discord.js');
  client.user.setActivity('fate', {
    type: 'WATCHING',
  });
  client.guilds.cache.get('761203866732724225').channels.cache.get('787087630390919228').send(
      new Discord.MessageEmbed()
        .setTitle('Astolfo is online!')
        .setDescription(`Listening on ${client.guilds.cache.size} guilds!`)
        .setColor('GREEN')
        .setFooter(config.version),
    );
  console.log(`\x1b[32;10m${con.OK}\x1b[0m${net.complete}`);
  console.log(`\x1b[32;10m${con.OK}\x1b[0m${ev.ready[0]}${config.version}${ev.ready[1]}`);
  console.log(`\x1b[32;10m${con.OK}\x1b[0m${ev.listening[0]}\x1b[33;10m${client.guilds.cache.size}\x1b[0m${ev.listening[1]}${con.LINE}`);
};