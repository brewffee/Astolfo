const Discord = require('discord.js');
const Command = require('../../util/Command');

module.exports = new Command({
  name: 'ping',
  description: 'Pong!',
  usage: 'a!eval <code> [--return <any>]',
  args: [],
  run: async (message, args, flags) => {
    const msg = await message.channel.send(
      new Discord.MessageEmbed()
        .setDescription('Pinging... 📡'),
    );
    msg.edit(
      new Discord.MessageEmbed()
        .setColor('#f7b2d9')
        .setDescription(`Pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms, heartbeat ${message.client.ws.ping}ms.`),
    );
  },
});