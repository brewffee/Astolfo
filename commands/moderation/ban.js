module.exports.run = async (client, message, args) => {
    // Create the embeds
    const errorEmbed = new (require('discord.js').MessageEmbed)()
        .setColor('#f7b2d9')
        .setTitle('Uh oh!');
    // Permission and context checks
    if (!message.guild && message.channel.type === 'dm') {
        errorEmbed.setDescription('You\'re trying to use a guild-only command in a DM!');
        return message.channel.send(errorEmbed);
    } else if (!message.guild.member(message.author).hasPermission('BAN_MEMBERS')) {
        errorEmbed.setDescription('You do not have permission to ban members!');
        return message.channel.send(errorEmbed);
    } else if (!message.guild.me.hasPermission('BAN_MEMBERS')) {
        errorEmbed.setDescription('I don\'t have permission to ban members!');
        return message.channel.send(errorEmbed);
    }
    // Define changing variables
    let memberID, isGlobal, toBan,
        banReason = args.join(' ').replace(args[0], '');
    // Create the ban embed
    const banEmbed = new (require('discord.js').MessageEmbed)()
        .setColor('#f7b2d9')
        .setTitle('Member successfully banned.')
        .setDescription(`Banned ${toBan} from the server.\n\`\`\`Reason: ${banReason}\`\`\``)
        .setFooter(`Moderator: ${message.author.tag}`, message.author.displayAvatarURL());
    // Check for a GuildMember/User
    if (!args[0]) {
        // Check if no arguments were given
        return message.channel.send(errorEmbed.setDescription('Invalid usage.\nUsage: `a!ban <member> [reason]`'));
    } else if (args[0].startsWith('<@') && args[0].endsWith('>') && args[0].replace(/[^0-9]/g, '').length == 18) {
        // Check if given argument is a mention
        memberID = args[0].toString().replace(/[^0-9]/g, '');
    } else if (!args[0].startsWith('<@') && args[0].length == 18 && /[0-9]+$/.test(args[0])) {
        // Check if given argument is a user ID
        memberID = args[0].toString();
    } else {
        // Check if given argument does not match ID or mention format
        return message.channel.send(errorEmbed.setDescription('Invalid user specified.\nUsage: `a!ban <member> [reason]`'));
    }

    // Find a GuildMember if all checks passed
    try {
        toBan = await message.guild.members.fetch({ user: memberID, force: true, cache: false });
    } catch (E) {
        if (E.message === 'Unknown Member') {
            // Declare a global user if no guild member was found
            isGlobal = true; toBan = memberID;
        }
    }

    // Check for a banReason to associate the ban with
    if (banReason.length < 1) {
        banReason = 'No reason provided';
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
        if (JSON.stringify(bans).includes(toBan)) {
            // Prevent banning of an already banned User
            return message.channel.send(errorEmbed.setDescription('That user is already banned!'));
        }
        // Attempt to ban the user, send error if failed.
        try {
            message.guild.members.ban({ user: memberID, days: 7, reason: banReason });
        } catch (error) {
            message.channel.send('Triggered isGlobal error'),
                console.error,
                message.channel.send(errorEmbed.setDescription('An unknown error occured whilst trying to run that command! Please try again in a few seconds.'));
        }
        // Send the embed
        return message.channel.send(banEmbed);
    }
};
