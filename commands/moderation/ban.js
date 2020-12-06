module.exports.run = async (client, message, args) => {
    const errorEmbed = new (require('discord.js').MessageEmbed)()
            .setColor('#f7b2d9')
            .setTitle('Uh oh!');
    let memberID;
    if (!args[0]) {
        errorEmbed.setDescription('No member specified.\nUsage: `a!ban <member> [reason]`');
        return message.channel.send(errorEmbed);
    } else if (args[0].startsWith('<@') && args[0].endsWith('>')) {
        memberID = args[0].toString().replace(/[^0-9]/g, '');
        // return message.channel.send(`ggz, user was ${toBan_ID} (raw: \`${message.content}\`, to: \`${toBan_ID}\`)`);
    } else if (!args[0].startsWith('<@') && args[0].length == 18 && /[0-9]+$/.test(args[0])) {
        memberID = args[0].toString();
        // return message.channel.send(`ggz, id was ${toBan_ID} (raw: \`${message.content}\`, to: \`${toBan_ID}\`)`);
    }
    const toBan = await message.guild.members.cache.find(gm => gm.user.id == memberID);
    if (!toBan) {
        errorEmbed.setDescription('Invalid member specified.\nUsage: `a!ban <member> [reason]`');
        return message.channel.send(errorEmbed);
    }
    let banReason = args.slice(args[0].length).trim();
    if (banReason.length < 1) {
        banReason = 'No reason provided';
    }
    if (!message.guild) {
        errorEmbed.setDescription('You\'re trying to use a guild-only command in a DM!');
        return message.channel.send(errorEmbed);
    } else if (!message.guild.member(message.author).hasPermission('BAN_MEMBERS')) {
        errorEmbed.setDescription('You do not have permission to ban members!');
        return message.channel.send(errorEmbed);
    } else if (!message.guild.me.hasPermission('BAN_MEMBERS')) {
        errorEmbed.setDescription('I don\'t have permission to ban members!');
        return message.channel.send(errorEmbed);
    } else if (toBan == message.author.id) {
        errorEmbed.setDescription('You can\'t ban yourself!');
        return message.channel.send(errorEmbed);
    } else if (toBan == message.guild.me.id) {
        errorEmbed.setDescription('I can\'t ban myself!');
        return message.channel.send(errorEmbed);
    } else if (!message.guild.member(toBan).bannable || message.guild.member(toBan).hasPermission('ADMINISTRATOR')) {
        errorEmbed.setDescription('The specified member is immune to bans!');
        return message.channel.send(errorEmbed);
    }

    // Execute ban
    const banEmbed = new (require('discord.js').MessageEmbed)()
        .setColor('#f7b2d9')
        .setTitle('Member successfully banned.')
        .setDescription(`Banned ${toBan} from the server.\n\`\`\`${banReason}\`\`\``)
        .setFooter(`Moderator: ${message.author.tag}`, message.author.displayAvatarURL());

    message.guild.members.ban(memberID, { days: 7, reason: banReason })
    .catch(
        console.error,
        errorEmbed.setDescription('An unknown error occured whilst trying to run that command! Please try again in a few seconds.'),
        message.channel.send(errorEmbed),
    );
    return message.channel.send(banEmbed);
};
