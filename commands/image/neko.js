const Errors = require('../../util/Errors.js');
const Discord = require('discord.js');
const Command = require('../../util/Command');

module.exports = new Command({
  name: 'neko',
  description: 'Sends a random neko picture.',
  usage: 'a!eval <code> [--return <any>]',
  args: [],
  run: async (message, args, flags) => {
    try {
      if (args[1]) null; // Errors.throw('NekoUsage', message.channel);
      const { image } = (await (await require('node-fetch')('http://api.nekos.fun:8080/api/neko')).json());
      return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle('Nekos!')
          .setColor(16233177)
          .setURL(image)
          .setImage(image)
          .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true })),
      );
    } catch (error) {
      return Errors.throw('Generic', message.channel);
    }
  },
});