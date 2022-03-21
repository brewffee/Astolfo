const Errors = require('../../util/Errors.js');
const Users = require('../../util/Users.js');
const Discord = require('discord.js');
const Command = require('../../util/Command');

module.exports = new Command({
  name: 'softban',
  description: 'Bans and then unbans a user from the server',
  usage: 'a!softban <user> [reason]',
  args: [
    { name: 'user', optional: false, type: 'string' },
    { name: 'reason', optional: true, type: 'string' },
  ],
  permissions: ['BAN_MEMBERS'],
  access: {
    guildOnly: true,
    permissions: ['BAN_MEMBERS'],
  },
  run: async (message, args, flags) => {
    let member;
    let reason;
    let unreachable;
    try {
      if (!args[0]) return Errors.throw('SoftbanUsage', message.channel);
      if (message.channel.type === 'dm') return Errors.throw('GuildOnly', message.channel);
      if (!message.member.permissions.has('BAN_MEMBERS')) return Errors.throw('BanPermission', message.channel);
      if (!message.guild.me.permissions.has('BAN_MEMBERS')) return Errors.throw('BanPermissionClient', message.channel);
      member = await Users.guildFetch(args[0], message.guild).catch(() => null);
      if (!member) return Errors.throw('NoMember', message.channel);
      reason = args.slice(1).join(' ').replace(/`/g, '`\u200b').trim() || 'No reason provided';
      if (member === message.member) return Errors.throw('SoftbanSelf', message.channel);
      if (member === message.guild.me) return Errors.throw('SoftbanSelfClient', message.channel);
      if (member.bannable) return Errors.throw('SoftbanImmune', message.channel);
      try {
        await member.send(`You have been softbanned from ${message.guild} for: ${reason}`/* ${appeal ? `You can appeal at ${appeal}` : ''} */).catch(() => unreachable = true);
        await message.guild.members.ban(member.user.id, { days: 7, reason: reason });
        await message.guild.members.unban(member.user.id, reason);
      } catch (error) {
        console.log(error);
        return Errors.throw('Unknown', message.channel);
      }
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#f7b2d9')
          .setTitle('member successfully softbanned.')
          .setDescription(`${member.user.username} was softbanned from the server.\n\`\`\`Reason: ${reason}\`\`\`${unreachable ? 'This member is unreachable and will not see the ban reason.' : ''}`)
          .setFooter(`Moderator: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true })));
    } catch (error) {
      console.log(error);
    }
  },
});
