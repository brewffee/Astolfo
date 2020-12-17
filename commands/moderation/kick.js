module.exports.run = async (client, message, args) => {
    const config = require('../../config/config.json'),
        errorEmbed = new (require('discord.js').MessageEmbed)()
            .setColor('#f7b2d9')
            .setTitle('Uh oh!');
    let memberID;
    console.log('let memberID;')
    if (!args[0]) {
        // Check if no arguments were given
        return message.channel.send(errorEmbed.setDescription('No member specified.\nUsage: `a!kick <member> [reason]`'));
    } else if (args[0].startsWith('<@') && args[0].endsWith('>') && args[0].replace(/[^0-9]/g, '').length == 18) {
        // Check if given argument is a mention
        memberID = args[0].toString().replace(/[^0-9]/g, '');
    } else if (!args[0].startsWith('<@') && args[0].length == 18 && /[0-9]+$/.test(args[0])) {
        // Check if given argument is a user ID
        memberID = args[0].toString();
    } else {
        // Check if given argument does not match ID or mention format
        return message.channel.send(errorEmbed.setDescription('Invalid member specified.\nUsage: `a!kick <member> [reason]`'));
    }
    console.log('passed checks')
    console.log(memberID);

    // Find a GuildMember if all checks passed
    // const toKick = await message.guild.members.cache.find(gm => gm.user.id == memberID);
    console.log('finding gm')
    let toKick;
    try {
        toKick = await message.guild.members.fetch({ user: memberID, force: true, cache: false })
    } catch (E) {
        if (E.message === 'Unknown Member') {
            return message.channel.send(
                errorEmbed.setDescription('You can\'t kick someone who isn\'t in the server!')
            );
        }
    }

    console.log('found')
    // Check for a kickReason to associate the ban with
    let kickReason = args.slice(1).join(' ');
    if (kickReason.length < 1) {
        kickReason = 'No reason provided';
    }

    // Permission and context checks
    if (!message.guild) {
        errorEmbed.setDescription('You\'re trying to use a guild-only command in a DM!');
        return message.channel.send(errorEmbed);
    } else if (!message.guild.member(message.author).hasPermission('KICK_MEMBERS')) {
        errorEmbed.setDescription('You do not have permission to kick members!');
        return message.channel.send(errorEmbed);
    } else if (!message.guild.me.hasPermission('KICK_MEMBERS')) {
        errorEmbed.setDescription('I don\'t have permission to kick members!');
        return message.channel.send(errorEmbed);
    }

    if (toKick == message.author.id) {
        return message.channel.send(errorEmbed.setDescription('You can\'t kick yourself!'));
    } else if (toKick == message.guild.me.id) {
        return message.channel.send(errorEmbed.setDescription('I can\'t kick myself!'));
    } else if (!message.guild.member(toKick).bannable || message.guild.member(toKick).hasPermission('ADMINISTRATOR')) {
        return message.channel.send(errorEmbed.setDescription('The specified member is immune to kicks!'));
    }

    // Kick the GuildMember

    // Create the embed
    const kickEmbed = new (require('discord.js').MessageEmbed)()
        .setColor('#f7b2d9')
        .setTitle('Member successfully kicked.')
        .setDescription(`Removed ${toKick} from the server.\n\`\`\`Reason: ${kickReason}\`\`\``)
        .setFooter(`Moderator: ${message.author.tag}`, message.author.displayAvatarURL());
    if (config.debug) {
        kickEmbed
            .addField('Debug Mode', `\`\`\`Message: ${message}\n\nRecieved: ${memberID}, ${kickReason}\n\nUsing: ${memberID}, ${toKick}, ${kickReason}\`\`\``);
    }

    // Attempt to kick the GuildMember, send error if failed.
    try {
        toKick.kick({ reason: kickReason });
    } catch (error) {
        console.error;
        message.channel.send(errorEmbed.setDescription('An unknown error occured whilst trying to run that command! Please try again in a few seconds.'));
    }
    // Send the ban embed
    toKick = null;
    memberID = null;
    return message.channel.send(kickEmbed);
};
