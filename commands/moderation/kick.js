/* eslint-disable no-redeclare */
const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
    const errorEmbed = new MessageEmbed()
        .setColor('#f7b2d9')
        .setTitle('Uh oh!');

    if (!args[0]) {
        errorEmbed.setDescription('No member specified.\nUsage: `a!kick <user> [reason]`');
        return message.channel.send(errorEmbed);
    } else if (args[0].startsWith('<@') && args[0].endsWith('>')) {
        var memberID = args[0].toString().replace(/[^0-9]/g, '');
        // return message.channel.send(`ggz, user was ${toBan_ID} (raw: \`${message.content}\`, to: \`${toBan_ID}\`)`);
    } else if (!args[0].startsWith('<@') && args[0].length == 18 && /[0-9]+$/.test(args[0])) {
        var memberID = args[0].toString();
        // return message.channel.send(`ggz, id was ${toBan_ID} (raw: \`${message.content}\`, to: \`${toBan_ID}\`)`);
    }
    const toKick = await message.guild.members.cache.find(gm => gm.user.id == memberID);
    if (!toKick) {
        errorEmbed.setDescription('Invalid member specified.\nUsage: `a!kick <user> [reason]`');
        return message.channel.send(errorEmbed);
    }
    var kickReason = args.toString().replace(`${args[0]}`, '').replace(/,/g, ' ');
    if (kickReason.length < 1) {
        var kickReason = 'No reason provided';
    }
    if (!message.guild) {
        errorEmbed.setDescription('You\'re trying to use a guild-only command in a DM!');
        return message.channel.send(errorEmbed);
    } else if (!message.guild.member(message.author).hasPermission('KICK_MEMBERS')) {
        errorEmbed.setDescription('You do not have permission to kick members!');
        return message.channel.send(errorEmbed);
    } else if (!message.guild.me.hasPermission('KICK_MEMBERS')) {
        errorEmbed.setDescription('I don\'t have permission to kick members!');
        return message.channel.send(errorEmbed);
    } else if (toKick == message.author.id) {
        errorEmbed.setDescription('You can\'t kick yourself!');
        return message.channel.send(errorEmbed);
    } else if (toKick == message.guild.me.id) {
        errorEmbed.setDescription('I can\'t kick myself!');
        return message.channel.send(errorEmbed);
    } else if (!message.guild.member(toKick).kickable || message.guild.member(toKick).hasPermission('ADMINISTRATOR')) {
        errorEmbed.setDescription('The specified member is immune to kicks!');
        return message.channel.send(errorEmbed);
    }

    // Execute kick
    const kickEmbed = new MessageEmbed()
        .setColor('#f7b2d9')
        .setTitle('Member successfully kicked.')
        .setDescription(`Kicked ${toKick} from the server.\n\`\`\`${kickReason}\`\`\``)
        .setFooter(`Moderator: ${message.author.tag}`, message.author.displayAvatarURL());

    toKick.kick();
    return message.channel.send(kickEmbed)
        .catch(
            console.error,
            errorEmbed.setDescription('An unknown error occured whilst trying to run that command! Please try again in a few seconds.'),
            message.channel.send(errorEmbed),
        );
};
