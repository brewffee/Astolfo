const Errors = require('../../util/Errors.js');
const Users = require('../../util/Users.js');
const Discord = require('discord.js');
const Command = require('../../util/Command');

module.exports = new Command({
  name: 'unban',
  description: 'Unbans a user from the server',
  usage: 'a!unban <user> [reason]',
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
    let user;
    let reason;
    try {
      if (!args[0]) return Errors.throw('UnbanUsage', message.channel);
      if (message.channel.type === 'dm') return Errors.throw('GuildOnly', message.channel);
      if (!message.member.permissions.has('BAN_MEMBERS')) return Errors.throw('BanPermission', message.channel);
      if (!message.guild.me.permissions.has('BAN_MEMBERS')) return Errors.throw('BanPermissionClient', message.channel);
      user = await Users.fetch(args[0], message.client).catch(() => null);
      if (!user) return Errors.throw('UnbanMember', message.channel);
      reason = args.slice(1).join(' ').replace(/`/g, '`\u200b').trim() || 'No reason provided';
      if (user === message.author) return Errors.throw('UnbanSelf', message.channel);
      if (user === message.client.user) return Errors.throw('UnbanSelfClient', message.channel);
      const bans = await message.guild.fetchBans();
      if (!JSON.stringify(bans).includes(user.id)) {
        return Errors.throw('UnbanUnbanned', message.channel);
      }
      try {
        await message.guild.members.unban(user.id, reason);
      } catch (error) {
        console.log(error);
        return Errors.throw('Unknown', message.channel);
      }
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#f7b2d9')
          .setTitle('User successfully unbanned.')
          .setDescription(`${user.username} will now be able to join the server.\n\`\`\`Reason: ${reason}\`\`\``)
          .setFooter(`Moderator: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true })));
    } catch (error) {
      console.log(error);
    }
  },
});
