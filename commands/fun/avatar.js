module.exports.run = async (message, args) => {
  const err = require('../../util/Errors.js'),
    { getMember } = require('../../util/Member.js');
  let member;
  if (args[1]) {
    // Check if too many arguments were given
    return err.throw('AvatarUsage', message.channel);
  }

  args[0] ? member = await getMember(args[0], message.guild) : member = message.author.id;

  // Find a GuildMember if all checks passed
  let foundMember;
  try {
    foundMember = await message.guild.members.fetch({ user: member, force: true, cache: false });
  } catch (E) {
    if (E.message === 'Unknown Member') {
      return err.throw('AvatarMember', message.channel);
    }
  }
  console.log(member);

  // Retrieve and send the avatar
  message.channel.send(
    new (require('discord.js')).MessageEmbed()
      .setColor('#f7b2d9')
      .setImage(`${foundMember.user.displayAvatarURL({ size: 4096, dynamic: true })}`)
      .setTitle(`Avatar of ${foundMember.user.username}`),
  );
};