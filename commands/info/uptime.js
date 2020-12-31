module.exports.run = async (message) => {
  const ms = require('ms');
  message.channel.send(
    new (require('discord.js').MessageEmbed)()
      .setColor('#f7b2d9')
      .setDescription(`It has been **${ms(message.client.uptime, { long: true })}** since the last restart`),
  );
};
