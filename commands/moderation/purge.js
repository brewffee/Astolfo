const Command = require('../../util/Command');

module.exports = new Command({
  name: 'purge',
  description: 'Bulk deletes messages from the server.',
  usage: 'a!purge <amount> [--silent|--anon]',
  args: [
    { name: 'amount', optional: false, type: 'string' },
  ],
  permissions: ['MANAGE_MESSAGES'],
  access: {
    guildOnly: true,
    permissions: ['MANAGE_MESSAGES'],
  },
  run: async (message, args, flags) => {
    const errorEmbed = new (require('discord.js')).MessageEmbed()
      .setColor('#f7b2d9')
      .setTitle('Uh oh!'),
      finishEmbed = new (require('discord.js')).MessageEmbed()
        .setColor('#f7b2d9')
        .setTitle('Purge successful')
        .setDescription(`Deleted **${parseInt(args[0])}** messages.`);
    if (message.channel.type === 'dm') {
      return message.channel.send(errorEmbed.setDescription('You\'re trying to use a guild-only command in a DM!'));
    } else if (!message.member.permissions.has('MANAGE_MESSAGES')) {
      return message.channel.send(errorEmbed.setDescription('You don\'t have permission to manage messages!'));
    } else if (!message.guild.me.permissions.has('MANAGE_MESSAGES')) {
      return message.channel.send(errorEmbed.setDescription('I don\'t have permission to manage messages!'));
    } else if (!args[0] || isNaN(args[0]) || args[1]) {
      return message.channel.send(errorEmbed.setDescription('Invalid usage.\nUsage: `a!purge <amount> [--silent|--anon]`'));
    } else if (parseInt(args[0]) >= 100 || parseInt(args[0]) <= 1) {
      return message.channel.send(errorEmbed.setDescription('Amount must be more than `1` and less than `100`\nUsage: `a!purge <amount> [--silent|--anon]`'));
    }
    try {
      message.delete();
      message.channel.bulkDelete(parseInt(args[0]));
      flags.anon ? null : finishEmbed.setFooter(`Moderator: ${message.author.tag}`, message.author.displayAvatarURL());
      flags.silent ? null : message.channel.send(finishEmbed);
    } catch (e) {
      console.log(e);
      message.channel.send(errorEmbed.setDescription('An unknown error occured whilst trying to run that command! Please try again in a few seconds.'));
    }
  },
});
