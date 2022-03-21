const Errors = require('../../util/Errors.js');
const Users = require('../../util/Users.js');
const Discord = require('discord.js');
const Command = require('../../util/Command');

module.exports = new Command({
  name: 'avatar',
  description: 'avatar penis uoue',
  usage: 'a!eval <code> [--return <any>]',
  args: [
    { name: 'user', optional: true, type: String },
  ],
  run: async (message, args, flags) => {
    try {
      if (args[1]) return Errors.throw('AvatarUsage', message.channel);
      const member = args[0] ? await Users.fetch(args[0], message.client) : message.author;
      const avatar = member.displayAvatarURL({ dynamic: true });
      const downloads = [  
        `${avatar.includes('.gif') ? `[GIF](${message.author.displayAvatarURL({ dynamic: true, size: 4096 })}) | ` : ''}` +
        `[JPG](${message.author.displayAvatarURL({ size: 4096, format: 'jpg' })}) | ` +
        `[PNG](${message.author.displayAvatarURL({ size: 4096, format: 'png' })}) | ` +
        `[WEBP](${message.author.displayAvatarURL({ size: 4096 })})`,
      ];

      message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#f7b2d9')
          .setImage(member.displayAvatarURL({ size: 256, dynamic: true }))
          .setTitle(`Avatar of ${member.username}`)
          .addField('Download As', downloads.join())
          .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true })),
      );
    } catch (error) {
      console.log(error);
    }
  },
});


