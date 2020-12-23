module.exports.run = async (message, args) => {
    const errorEmbed = new (require('discord.js').MessageEmbed)()
        .setColor('#f7b2d9')
        .setTitle('Uh oh!');
    let memberID;
    if (!args[0]) {
        // Check if no arguments were given
        return message.channel.send(errorEmbed.setDescription('No user specified.\nUsage: `a!unban <user> [reason]`'));
    } else if (args[0].startsWith('<@') && args[0].endsWith('>') && args[0].replace(/[^0-9]/g, '').length == 18) {
        // Check if given argument is a mention (mentions are rare, but can be used for unbans)
        memberID = args[0].toString().replace(/[^0-9]/g, '');
    } else if (!args[0].startsWith('<@') && args[0].length == 18 && /[0-9]+$/.test(args[0])) {
        // Check if given argument is a user ID
        memberID = args[0].toString();
    } else {
        // Check if given argument does not match ID or mention format
        return message.channel.send(errorEmbed.setDescription('Invalid user specified.\nUsage: `a!unban <member> [reason]`'));
    }

    // Define the user if all checks passed
    const toPardon = memberID;

    // Check for a pardonReason to associate the unban with
    let pardonReason = args.join(' ').replace(args[0], '');
    if (pardonReason.length < 1) {
        pardonReason = 'No reason provided';
    }

    // Permission and context checks
    if (!message.guild) {
        return message.channel.send(errorEmbed.setDescription('You\'re trying to use a guild-only command in a DM!'));
    } else if (!message.guild.member(message.author).hasPermission('BAN_MEMBERS')) {
        return message.channel.send(errorEmbed.setDescription('You do not have permission to manage bans!'));
    } else if (!message.guild.me.hasPermission('BAN_MEMBERS')) {
        return message.channel.send(errorEmbed.setDescription('I don\'t have permission to manage bans!'));
    }

    if (toPardon == message.author.id) {
        return message.channel.send(errorEmbed.setDescription('If you\'re banned, how are you running this?'));
    } else if (toPardon == message.guild.me.id) {
        return message.channel.send(errorEmbed.setDescription('I\'m pretty sure I\'m not banned :)'));
    }

    // Lift the ban

    // Find the ban
    const bans = await message.guild.fetchBans();
    if (!JSON.stringify(bans).includes(toPardon)) {
        return message.channel.send(errorEmbed.setDescription('This user isn\'t banned!'));
    } // else: The ban exists, action time

    // Create the pardon embed
    const pardonEmbed = new (require('discord.js').MessageEmbed)()
        .setColor('#f7b2d9')
        .setTitle('User successfully pardoned.')
        .setDescription(`\`\`\`Reason: ${pardonReason}\`\`\``)
        .setFooter(`Moderator: ${message.author.tag}`, message.author.displayAvatarURL());

    // Attempt to unban the user, send error if failed.
    try {
        message.guild.members.unban(memberID, { reason: pardonReason });
    } catch (error) {
        console.error;
        return message.channel.send(errorEmbed.setDescription('An unknown error occured whilst trying to run that command! Please try again in a few seconds.'));
    }

    // Send the pardon embed
    return message.channel.send(pardonEmbed);
};
