const Command = require('../../util/Command');
const Errors = require('../../util/Errors.js');
const Users = require('../../util/Users.js');
const Discord = require('discord.js');

module.exports = new Command({
  name: 'ban',
  description: 'Bans a given user from the server',
  usage: 'a!ban <user> [reason]',
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
    console.log('run1');
    let user;
    let reason;
    let unreachable;
    try {
      if (!args[0]) return Errors.throw('BanUsage', message.channel);
      if (message.channel.type === 'dm') return Errors.throw('GuildOnly', message.channel);
      if (!message.member.permissions.has('BAN_MEMBERS')) return Errors.throw('BanPermission', message.channel);
      if (!message.guild.me.permissions.has('BAN_MEMBERS')) return Errors.throw('BanPermissionClient', message.channel);
      user = await Users.fetch(args[0], message.client).catch(() => null);
      if (!user) return Errors.throw('BanMember', message.channel);
      reason = args.slice(1).join(' ').replace(/`/g, '`\u200b').trim() || 'No reason provided';
      if (user === message.author) return Errors.throw('BanSelf', message.channel);
      if (user === message.client.user) return Errors.throw('BanSelfClient', message.channel);
      if (message.guild.member(user)) {
        if (!message.guild.member(user)?.bannable) return Errors.throw('BanImmune', message.channel);
      }
      const bans = await message.guild.fetchBans();
      if (JSON.stringify(bans).includes(user.id)) {
        return Errors.throw('BanExisting', message.channel);
      }
      try {
        //await user.send(`You have been banned from ${message.guild} for: ${reason}`/* ${appeal ? `You can appeal at ${appeal}` : ''} */).catch(() => unreachable = true);
        await message.guild.members.ban(user.id, { days: 7, reason: reason });
      } catch (error) {
        console.log(error);
        return Errors.throw('Unknown', message.channel);
      }
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#f7b2d9')
          .setTitle('User successfully banned.')
          .setDescription(`${user.username} will no longer be able to join the server.\n\`\`\`Reason: ${reason}\`\`\`${unreachable ? 'This user is unreachable and will not see the ban reason.' : ''}`)
          .setFooter(`Moderator: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true })));
    } catch (error) {
      console.log(error);
    }
  },
});
