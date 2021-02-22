module.exports.run = async (message) => {
  const Discord = require('discord.js');
  try {
    const msg = await message.channel.send(
      new Discord.MessageEmbed()
        .setDescription('Pinging... 📡'),
    );
    msg.edit(
      new Discord.MessageEmbed()
        .setColor('#f7b2d9')
        .setDescription(`Pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms, heartbeat ${message.client.ws.ping}ms.`),
    );
  } catch (error) {
    console.log(error);
  }
};