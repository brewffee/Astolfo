module.exports.run = async (client, message, args) => {
    const errorEmbed = new (require('discord.js').MessageEmbed)()
        .setColor('#f7b2d9')
        .setTitle('Uh oh!');
    let memberID;
    if (!args[0]) {
        // Check if no arguments were given
        return message.channel.send(errorEmbed.setDescription('No member specified.\nUsage: `a!ban <member> [reason]`'));
    } else if (args[0].startsWith('<@') && args[0].endsWith('>') && args[0].replace(/[^0-9]/g, '').length == 18) {
        // Check if given argument is a mention
        memberID = args[0].toString().replace(/[^0-9]/g, '');
    } else if (!args[0].startsWith('<@') && args[0].length == 18 && /[0-9]+$/.test(args[0])) {
        // Check if given argument is a user ID
        memberID = args[0].toString();
    } else {
        // Check if given argument does not match ID or mention format
        return message.channel.send(errorEmbed.setDescription('Invalid member specified.\nUsage: `a!ban <member> [reason]`'));
    }

    // Find a GuildMember if all checks passed
    let isGlobal;
    let toBan = await message.guild.members.cache.find(gm => gm.user.id == memberID);
    if (!toBan) {
        isGlobal = true;
        toBan = memberID;
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

    // Checks (if GuildMember is present)
    if (!isGlobal) {
        if (toBan == message.author.id) {
            return message.channel.send(errorEmbed.setDescription('You can\'t ban yourself!'));
        } else if (toBan == message.guild.me.id) {
            return message.channel.send(errorEmbed.setDescription('I can\'t ban myself!'));
        } else if (!message.guild.member(toBan).bannable || message.guild.member(toBan).hasPermission('ADMINISTRATOR')) {
            return message.channel.send(errorEmbed.setDescription('The specified member is immune to bans!'));
        }
    }

    // There are no checks for a global user because they
    // cannot be accessed by the bot, and if the global
    // user were to be the bot or the executor, those
    // conditions would be impossible to meet.

    // Ban the user if they are a GuildMember

    if (!isGlobal) {
        // Check if the GuildMember is already banned (This shouldn't happen, but just in case)
        const bans = await message.guild.fetchBans();
        if (JSON.stringify(bans).includes(toBan)) { // Ban entry found, fella's already gone
            return message.channel.send(errorEmbed.setDescription('That user is already banned!'));
        } // else: No bans found, clapping time :)
        const banEmbed = new (require('discord.js').MessageEmbed)()
            .setColor('#f7b2d9')
            .setTitle('Member successfully banned.')
            .setDescription(`Banned ${toBan} from the server.\n\`\`\`Reason: ${banReason}\`\`\``)
            .setFooter(`Moderator: ${message.author.tag}`, message.author.displayAvatarURL());
        // Attempt to ban the GuildMember, send error if failed.
        try {
            message.guild.members.ban(memberID, { days: 7, reason: banReason });
        } catch (error) {
            console.error;
            message.channel.send(errorEmbed.setDescription('An unknown error occured whilst trying to run that command! Please try again in a few seconds.'));
        }
        // Send the ban embed
        return message.channel.send(banEmbed);
    } else {
        // Check if the user is banned
        const bans = await message.guild.fetchBans();
        if (JSON.stringify(bans).includes(toBan)) { // Ban entry found, fella's already gone
            return message.channel.send(errorEmbed.setDescription('That user is already banned!'));
        } // else: No bans found, clapping time :)
        // Create the ban embed
        const banEmbed = new (require('discord.js').MessageEmbed)()
            .setColor('#f7b2d9')
            .setTitle('User successfully banned.')
            .setDescription(`This user won't be able to join the guild.\n\`\`\`Reason: ${banReason}\`\`\``)
            .setFooter(`Moderator: ${message.author.tag}`, message.author.displayAvatarURL());
        // Attempt to ban the usert, send error if failed.
        try {
            message.guild.members.ban(memberID, { days: 7, reason: banReason });
        } catch (error) {
            message.channel.send('Triggered isGlobal error'),
                console.error,
                message.channel.send(errorEmbed.setDescription('An unknown error occured whilst trying to run that command! Please try again in a few seconds.'));
        }
        // Send the embed
        return message.channel.send(banEmbed);
    }
};
