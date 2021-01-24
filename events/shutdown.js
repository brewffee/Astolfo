module.exports = (client) => {
  const config = require('../config/config.json'),
    { con, net, ev } = require('../config/language.json'),
    { MessageEmbed } = require('discord.js');
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
};