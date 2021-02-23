module.exports.run = async (message, args) => {
  const Errors = require('../../util/Errors.js');
  const Users = require('../../util/Users.js');
  const Discord = require('discord.js');
  let user;
  let reason;
  try {
    if (!args[0]) return Errors.throw('BanUsage', message.channel);
    if (message.channel.type === 'dm') return Errors.throw('GuildOnly', message.channel);
    if (!message.member.permissions.has('BAN_MEMBERS')) return Errors.throw('BanPermission', message.channel);
    if (!message.guild.me.permissions.has('BAN_MEMBERS')) return Errors.throw('BanPermissionClient', message.channel);
    user = await Users.fetch(args[0], message.client);
    reason = args.slice(1).join(' ').replace(/`/g, '`\u200b').trim() || 'No reason provided';
    if (user == message.author) return Errors.throw('BanSelf', message.channel);
    if (user == message.client.user) return Errors.throw('BanSelfClient', message.channel);
    if (message.guild.member(user)) {
      if (!message.guild.member(user)?.bannable || message.guild.member(user)?.permissions.has('ADMINISTRATOR')) return Errors.throw('BanImmune', message.channel);
    }
    const bans = await message.guild.fetchBans();
    if (JSON.stringify(bans).includes(user.id)) {
      return Errors.throw('BanExisting', message.channel);
    }
    try {
      await user.send('banned xd').catch(() => console.log('cant msg rip'));
      await message.guild.members.ban(user.id, { days: 7, reason: reason });
    } catch (e) {
      console.log(e);
      return Errors.throw('Unknown', message.channel);
    }
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor('#f7b2d9')
        .setTitle('User successfully banned.')
        .setDescription(`${user.username} will no longer be able to join the server.\n\`\`\`Reason: ${reason}\`\`\``)
        .setFooter(`Moderator: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic:true })));
    } catch (error) {
      console.log(error);
  }
};