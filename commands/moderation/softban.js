module.exports.run = async (message, args) => {
    const errorEmbed = new (require('discord.js').MessageEmbed)()
        .setColor('#f7b2d9')
        .setTitle('Uh oh!');
    let memberID;
    if (!args[0]) {
        // Check if no arguments were given
        return message.channel.send(errorEmbed.setDescription('No member specified.\nUsage: `a!softban <member> [reason]`'));
    } else if (args[0].startsWith('<@') && args[0].endsWith('>') && args[0].replace(/[^0-9]/g, '').length == 18) {
        // Check if given argument is a mention
        memberID = args[0].toString().replace(/[^0-9]/g, '');
    } else if (!args[0].startsWith('<@') && args[0].length == 18 && /[0-9]+$/.test(args[0])) {
        // Check if given argument is a user ID
        memberID = args[0].toString();
    } else {
        // Check if given argument does not match ID or mention format
        return message.channel.send(errorEmbed.setDescription('Invalid member specified.\nUsage: `a!softban <member> [reason]`'));
    }

    // Find a GuildMember if all checks passed
    const toBan = await message.guild.members.cache.find(gm => gm.user.id == memberID);
    if (!toBan) {
        return message.channel.send(errorEmbed.setDescription('You can\'t softban someone who isn\'t in the server!'));
    }

    // Check for a banReason to associate the ban with
    let banReason = args.join(' ').replace(args[0], '');
    if (banReason.length < 1) {
        banReason = 'No reason provided';
    }

    // Permission and context checks
    if (!message.guild) {
        errorEmbed.setDescription('You\'re trying to use a guild-only command in a DM!');
        return message.channel.send(errorEmbed);
    } else if (!message.guild.member(message.author).hasPermission('BAN_MEMBERS')) {
        errorEmbed.setDescription('You do not have permission to ban members!');
        return message.channel.send(errorEmbed);
    } else if (!message.guild.me.hasPermission('BAN_MEMBERS')) {
        errorEmbed.setDescription('I don\'t have permission to ban members!');
        return message.channel.send(errorEmbed);
    }

    if (toBan == message.author.id) {
        return message.channel.send(errorEmbed.setDescription('You can\'t ban yourself!'));
    } else if (toBan == message.guild.me.id) {
        return message.channel.send(errorEmbed.setDescription('I can\'t ban myself!'));
    } else if (!message.guild.member(toBan).bannable || message.guild.member(toBan).hasPermission('ADMINISTRATOR')) {
        return message.channel.send(errorEmbed.setDescription('The specified member is immune to bans!'));
    }

    // Softban the member

    // Create the embed
    const banEmbed = new (require('discord.js').MessageEmbed)()
        .setColor('#f7b2d9')
        .setTitle('Member successfully softbanned.')
        .setDescription(`Softbanned ${toBan} from the server.\n\`\`\`Reason: ${banReason}\`\`\``)
        .setFooter(`Moderator: ${message.author.tag}`, message.author.displayAvatarURL());

    // Attempt to ban and then unban the GuildMember, send error if failed.
    try {
        message.guild.members.ban(memberID, { days: 7, reason: banReason });
        message.guild.members.unban(memberID, { reason: banReason });
    } catch (error) {
        console.error;
        message.channel.send(errorEmbed.setDescription('An unknown error occured whilst trying to run that command! Please try again in a few seconds.'));
    }
    // Send the ban embed
    return message.channel.send(banEmbed);
};
