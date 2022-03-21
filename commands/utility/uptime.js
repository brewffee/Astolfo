const ms = require('ms');
const Command = require('../../util/Command');

module.exports = new Command({
  name: 'uptime',
  description: 'not downtime',
  usage: 'a!eval <code> [--return <any>]',
  args: [],
  run: async (message, args, flags) => {
    message.channel.send(
      new (require('discord.js').MessageEmbed)()
        .setColor('#f7b2d9')
        .setDescription(`It has been **${ms(message.client.uptime, { long: true })}** since the last restart`),
    );
  },
});
