module.exports.run = async (message, args, flags) => {
  // Create the embeds
  const errorEmbed = new (require("discord.js").MessageEmbed)()
    .setColor("#f7b2d9")
    .setTitle("Uh oh!");
  // Permission and context checks
  if (!message.guild && message.channel.type === "dm") {
    errorEmbed.setDescription(
      "You're trying to use a guild-only command in a DM!"
    );
    return message.channel.send(errorEmbed);
  } else if (
    !message.guild.member(message.author).permissions.has("KICK_MEMBERS")
  ) {
    errorEmbed.setDescription("You do not have permission to kick members!");
    return message.channel.send(errorEmbed);
  } else if (!message.guild.me.permissions.has("KICK_MEMBERS")) {
    errorEmbed.setDescription("I don't have permission to kick members!");
    return message.channel.send(errorEmbed);
  }
  // Define changing variables
  let memberID, toKick;

  // Check for a kickReason to associate the kick with
  let kickReason;
  args[1]
    ? (kickReason = args.slice(1).join(" ").replace(/`/g, "`\u200b").trim())
    : (kickReason = "No reason provided");

  // Check for a GuildMember/User
  if (!args[0]) {
    // Check if no arguments were given
    return message.channel.send(
      errorEmbed.setDescription(
        "Invalid usage.\nUsage: `a!kick <member> [reason]`"
      )
    );
  } else if (/(^<@?!)?(\d)(>$)/.test(args[0])) {
    // Check if given argument is a mention
    memberID = args[0].toString().replace(/\D/g, "");
  } else if (/\d+$/.test(args[0])) {
    // Check if given argument is a user ID
    memberID = args[0].toString();
  } else {
    // Check if given argument does not match ID or mention format
    return message.channel.send(
      errorEmbed.setDescription(
        "Invalid user specified.\nUsage: `a!kick <member> [reason]`"
      )
    );
  }

  // Find a GuildMember if all checks passed
  try {
    toKick = await message.guild.members.fetch({
      user: memberID,
      force: true,
      cache: false,
    });
  } catch (E) {
    if (E.message === "Unknown User" || E.message === "Unknown Member") {
      // Stop if there is no member
      return message.channel.send(
        errorEmbed.setDescription(
          "You can't kick a user who isn't in the server!"
        )
      );
    }
  }

  // Checks the fetched member
  if (toKick == message.author.id) {
    return message.channel.send(
      errorEmbed.setDescription("You can't kick yourself!")
    );
  } else if (toKick == message.guild.me.id) {
    return message.channel.send(
      errorEmbed.setDescription("I can't kick myself!")
    );
  } else if (
    !message.guild.member(toKick).kickable ||
    message.guild.member(toKick).permissions.has("ADMINISTRATOR")
  ) {
    return message.channel.send(
      errorEmbed.setDescription("The specified member is immune to kicks!")
    );
  }

  // Attempt to kick the GuildMember, send error if failed.
  try {
    toKick.kick(kickReason);
  } catch (error) {
    console.error;
    message.channel.send(
      errorEmbed.setDescription(
        "An unknown error occured whilst trying to run that command! Please try again in a few seconds."
      )
    );
  }
  // Create the kick embed
  const kickEmbed = new (require("discord.js").MessageEmbed)()
    .setColor("#f7b2d9")
    .setTitle("Member successfully kicked.")
    .setDescription(
      `Removed ${toKick} from the server.\n\`\`\`Reason: ${kickReason}\`\`\``
    )
    .setFooter(
      `Moderator: ${message.author.tag}`,
      message.author.displayAvatarURL()
    );

  // Send the ban embed
  return message.channel.send(kickEmbed);
};
