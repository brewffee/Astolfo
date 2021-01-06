module.exports.run = async (message, args) => {
  const errorEmbed = new (require('discord.js').MessageEmbed)()
    .setColor('#f7b2d9')
    .setTitle('Uh oh!');
  let memberID;
  if (!args[0]) {
    // Check if no arguments were given
    memberID = message.author.id;
  } else if (args[1]) {
    // Check if too many arguments were given
    return message.channel.send(
      errorEmbed.setDescription('Invalid usage.\nUsage: `a!avatar [member]`'),
    );
  } else if (/(^<@?!)?(\d)(>$)/.test(args[0])) {
    // Check if given argument is a mention
    memberID = args[0].toString().replace(/[^0-9]/g, '');
  } else if (/\d+$/.test(args[0])) {
    // Check if given argument is a user ID
    memberID = args[0].toString();
  } else {
    // Check if given argument does not match ID or mention format
    return message.channel.send(
      errorEmbed.setDescription('Invalid member.\nUsage: `a!avatar [member]`'),
    );
  }

  // Find a GuildMember if all checks passed
  let foundMember;
  try {
    foundMember = await message.guild.members.fetch({ user: memberID, force: true, cache: false });
  } catch (E) {
    if (E.message === 'Unknown Member') {
      return message.channel.send(
        errorEmbed.setDescription(
          'I can\'t get the avatar of a someone who isn\'t in the server!',
        ),
      );
    }
  }

  // Retrieve and send the avatar
  message.channel.send(
    new (require('discord.js').MessageEmbed)()
      .setColor('#f7b2d9')
      .setImage(`${foundMember.user.displayAvatarURL({ size: 4096, dynamic: true })}`)
      .setTitle(`Avatar of ${foundMember.user.username}`),
  );
};