/* eslint-disable no-redeclare */
module.exports.run = async (client, message, args) => {
    const { MessageEmbed } = require('discord.js');
    if (!args[0]) {
        var memberID = message.author.id;
    } else if (args[0].startsWith('<@') && args[0].endsWith('>')) {
        var memberID = args[0].toString().replace(/[^0-9]/g, '');
    } else if (!args[0].startsWith('<@') && args[0].length == 18 && /[0-9]+$/.test(args[0])) {
        var memberID = args[0].toString();
    }
    var gMember = await message.guild.members.cache.find(gm => gm.user.id == memberID);
    if (!gMember) {
        return message.channel.send('wtf');
    }

    message.channel.send(
        new MessageEmbed()
        .setColor('#f7b2d9')
        .setImage(`${gMember.user.displayAvatarURL({ size: 4096 })}`)
        .setTitle(`Avatar of ${gMember.user.username}`),
    );

};

