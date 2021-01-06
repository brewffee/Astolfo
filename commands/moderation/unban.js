module.exports.run = async (message, args) => {
  // Create the embeds
  const errorEmbed = new (require('discord.js').MessageEmbed)()
    .setColor('#f7b2d9')
    .setTitle('Uh oh!');
  // Permission and context checks
  if (!message.guild && message.channel.type === 'dm') {
    errorEmbed.setDescription('You\'re trying to use a guild-only command in a DM!');
    return message.channel.send(errorEmbed);
  } else if (!message.guild.member(message.author).permissions.has('BAN_MEMBERS')) {
    errorEmbed.setDescription('You do not have permission to manage bans!');
    return message.channel.send(errorEmbed);
  } else if (!message.guild.me.permissions.has('BAN_MEMBERS')) {
    errorEmbed.setDescription('I don\'t have permission to manage bans!');
    return message.channel.send(errorEmbed);
  }
  // Define changing variables
  let memberID, toPardon;

  // Check for a pardonReason to associate the unban with
  let pardonReason;
  args[1] ? (pardonReason = args.slice(1).join(' ').replace(/`/g, '`\u200b').trim()) : (pardonReason = 'No reason provided');

  // Check for a GuildMember/User
  if (!args[0]) {
    // Check if no arguments were given
    return message.channel.send(
      errorEmbed.setDescription('Invalid usage.\nUsage: `a!unban <member> [reason]`'),
    );
  } else if (/(^<@?!)?(\d)(>$)/.test(args[0])) {
    // Check if given argument is a mention
    memberID = args[0].toString().replace(/\D/g, '');
  } else if (/\d+$/.test(args[0])) {
    // Check if given argument is a user ID
    memberID = args[0].toString();
  } else {
    // Check if given argument does not match ID or mention format
    return message.channel.send(
      errorEmbed.setDescription('Invalid user specified.\nUsage: `a!unban <member> [reason]`'),
    );
  }

  // Find a GuildMember if all checks passed
  try {
    toPardon = await message.guild.members.fetch({
      user: memberID,
      force: true,
      cache: false,
    });
  } catch (E) {
    if (E.message === 'Unknown User') {
      // Stop if the user is invalid
      return message.channel.send(
        errorEmbed.setDescription('Invalid user specified.\nUsage: `a!unban <member> [reason]`'),
      );
    }
  }

  // Checks the member
  if (toPardon == message.author.id) {
    return message.channel.send(
      errorEmbed.setDescription('If you\'re here, you\'re not banned 🤔'),
    );
  } else if (toPardon == message.guild.me.id) {
    return message.channel.send(
      errorEmbed.setDescription('I\'m already unbanned!'),
    );
  }

  // Check if the user is banned
  const bans = await message.guild.fetchBans();
  if (JSON.stringify(bans).includes(memberID)) {
    // Attempt to uban the user, send error if failed.
    try {
      message.guild.members.unban(memberID, { days: 7, reason: pardonReason });
    } catch (error) {
      console.error;
      message.channel.send(
        errorEmbed.setDescription('An unknown error occured whilst trying to run that command! Please try again in a few seconds.'),
      );
    }
    // Create the unban embed
    const unbanEmbed = new (require('discord.js').MessageEmbed)()
      .setColor('#f7b2d9')
      .setTitle('User successfully unbanned.')
      .setDescription(`This user will now be able to join the server.\n\`\`\`Reason: ${pardonReason}\`\`\``)
      .setFooter(`Moderator: ${message.author.tag}`, message.author.displayAvatarURL());

    // Send the embed
    return message.channel.send(unbanEmbed);
  } else {
    return message.channel.send(
      errorEmbed.setDescription('That user isn\'t banned!'),
    );
  }
};