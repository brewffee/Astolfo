module.exports = (client) => {
  const config = require('../config/config.json'),
    { MessageEmbed } = require('discord.js');
    client.guilds.cache.get('761203866732724225').channels.cache.get('787087630390919228').send(
      new MessageEmbed()
        .setTitle('Astolfo is shutting down...')
        .setDescription('Preparing to disconnect')
        .setColor('RED')
        .setFooter(config.version),
    );
    setTimeout(async () => {
      client.destroy();
      console.log(`\x1b[32;10m[ OK ] \x1b[0mShutdown completed.`);
      process.exit(0);
    }, 1000);
};