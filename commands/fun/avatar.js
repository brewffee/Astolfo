module.exports.run = async (client, message, args) => {
    const em = require('discord.js').MessageEmbed;
    let memberID;
    if (!args[0]) {
        memberID = message.author.id;
    } else if (args[0].startsWith('<@') && args[0].endsWith('>')) {
        memberID = args[0].toString().replace(/[^0-9]/g, '');
    } else if (!args[0].startsWith('<@') && args[0].length == 18 && /[0-9]+$/.test(args[0])) {
        memberID = args[0].toString();
    }
    const gMember = await message.guild.members.cache.find(gm => gm.user.id == memberID);
    if (!gMember) {
        return message.channel.send(
            new em()
                .setColor('#f7b2d9')
                .setTitle('Uh oh!')
                .setDesctiption('a!avatar [member]'),
        );
    }

    message.channel.send(
        new em()
            .setColor('#f7b2d9')
            .setImage(`${gMember.user.displayAvatarURL({ size: 4096, dynamic: true })}`)
            .setTitle(`Avatar of ${gMember.user.username}`),
    );

};

