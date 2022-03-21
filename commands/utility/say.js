const Errors = require('../../util/Errors.js');
const Discord = require('discord.js');
const Command = require('../../util/Command');

module.exports = new Command({
  name: 'say',
  description: 'Send an embedded message via the bot.',
  usage: 'a!say <message>',
  args: [
    { name: 'message', optional: false, type: 'string' },
  ],
  run: async (message, args, flags) => {
    try {
      if (!args[0]) return Errors.throw('SayUsage', message.channel);
      message.delete().catch(() => null);
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#f7b2d9')
          .setDescription(args.join(' '))
          .setTimestamp()
          .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true })),
      );
    } catch (error) {
      return Errors.throw('Generic', message.channel);
    }
  },
});