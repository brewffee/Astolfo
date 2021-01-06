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
    errorEmbed.setDescription('You do not have permission to ban members!');
    return message.channel.send(errorEmbed);
  } else if (!message.guild.me.permissions.has('BAN_MEMBERS')) {
    errorEmbed.setDescription('I don\'t have permission to ban members!');
    return message.channel.send(errorEmbed);
  }
  // Define changing variables
  let memberID, isGlobal, toBan;

  // Check for a banReason to associate the ban with
  let banReason;
  args[1] ? (banReason = args.slice(1).join(' ').replace(/`/g, '`\u200b').trim()) : (banReason = 'No reason provided');

  // Check for a GuildMember/User
  if (!args[0]) {
    // Check if no arguments were given
    return message.channel.send(
      errorEmbed.setDescription('Invalid usage.\nUsage: `a!softban <member> [reason]`'),
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
      errorEmbed.setDescription('Invalid user specified.\nUsage: `a!softban <member> [reason]`'),
    );
  }

  // Find a GuildMember if all checks passed
  try {
    toBan = await message.guild.members.fetch({ user: memberID, force: true, cache: false });
  } catch (E) {
    if (E.message === 'Unknown Member') {
      // Declare a global user if no guild member was found
      isGlobal = true;
      toBan = memberID;
    } else if (E.message === 'Unknown User') {
      // Stop if the user is invalid
      return message.channel.send(
        errorEmbed.setDescription('Invalid user specified.\nUsage: `a!softban <member> [reason]`'),
      );
    }
  }

  // Checks (if GuildMember is present)
  if (!isGlobal) {
    if (toBan == message.author.id) {
      return message.channel.send(
        errorEmbed.setDescription('You can\'t softban yourself!'),
      );
    } else if (toBan == message.guild.me.id) {
      return message.channel.send(
        errorEmbed.setDescription('I can\'t softban myself!'),
      );
    } else if (
      !message.guild.member(toBan).bannable ||
      message.guild.member(toBan).permissions.has('ADMINISTRATOR')
    ) {
      return message.channel.send(
        errorEmbed.setDescription('The specified member is immune to softbans!'),
      );
    }
  }
  // Softban the user if they are a GuildMember

  if (!isGlobal) {
    // Attempt to ban and unban the GuildMember, send error if failed.
    try {
      message.guild.members.ban(memberID, { days: 7, reason: banReason });
      message.guild.members.unban(memberID, { reason: banReason });
    } catch (error) {
      console.error;
      message.channel.send(
        errorEmbed.setDescription('An unknown error occured whilst trying to run that command! Please try again in a few seconds.'),
      );
    }
    // Create the ban embed
    const banEmbed = new (require('discord.js').MessageEmbed)()
      .setColor('#f7b2d9')
      .setTitle('Member successfully softbanned.')
      .setDescription(`Softbanned ${toBan} from the server.\n\`\`\`Reason: ${banReason}\`\`\``)
      .setFooter(
        `Moderator: ${message.author.tag}`,
        message.author.displayAvatarURL(),
      );

    // Send the ban embed
    return message.channel.send(banEmbed);
  } else {
    // Check if the user is banned
    const bans = await message.guild.fetchBans();
    if (JSON.stringify(bans).includes(memberID)) {
      // Prevent banning of an already banned User
      return message.channel.send(
        errorEmbed.setDescription('That user is already banned and cannot be softbanned!'),
      );
    }
    // Attempt to ban the user, send error if failed.
    try {
      // Delete the messages via banning
      message.guild.members.ban(memberID, { days: 7, reason: banReason });
      message.guild.members.unban(memberID, { reason: banReason });
    } catch (error) {
      console.error;
      message.channel.send(
        errorEmbed.setDescription('An unknown error occured whilst trying to run that command! Please try again in a few seconds.'),
      );
    }
    // Create the ban embed
    const banEmbed = new (require('discord.js').MessageEmbed)()
      .setColor('#f7b2d9')
      .setTitle('User successfully banned.')
      .setDescription(`This user will no longer be able to join the server.\n\`\`\`Reason: ${banReason}\`\`\``)
      .setFooter(`Moderator: ${message.author.tag}`, message.author.displayAvatarURL());

    // Send the embed
    return message.channel.send(banEmbed);
  }
};