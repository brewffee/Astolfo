const Discord = require('discord.js');
const config = require('../../config/config.json');
const Command = require('../../util/Command');

module.exports = new Command({
  name: 'invite',
  description: 'Sends the bot\'s invite link.',
  usage: 'a!eval <code> [--return <any>]',
  args: [],
  run: async (message, args, flags) => {
    message.channel.send(
      new Discord.MessageEmbed()
        .setColor('#f7b2d9')
        .setTitle('Click here to invite me to your server!')
        .setURL('https://discord.com/api/oauth2/authorize?client_id=779526520121065472&scope=bot')
        .setFooter(`Astolfo ${config.version}`),
    );
  },
});