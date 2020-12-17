module.exports.run = async (client, message, args) => {
    let memberID;
    if (!args[0]) {
        memberID = message.author.id;
    } else if (args[0].startsWith('<@') && args[0].endsWith('>')) {
        memberID = args[0].toString().replace(/[^0-9]/g, '');
    } else if (!args[0].startsWith('<@') && args[0].length == 18 && /[0-9]+$/.test(args[0])) {
        memberID = args[0].toString();
    }
    let gMember;
    try {
        gMember = await message.guild.members.fetch({ user: memberID, force: true, cache: false })
    } catch (E) {
        if (E.message === 'Unknown Member') {
            return message.channel.send(
                new (require('discord.js').MessageEmbed)()
                    .setColor('#f7b2d9')
                    .setTitle('Uh oh!')
                    .setDescription('You can\'t get the avatar of someone who isn\'t in the server!')
            );
        }
    }
    message.channel.send(
        new (require('discord.js').MessageEmbed)()
            .setColor('#f7b2d9')
            .setImage(`${gMember.user.displayAvatarURL({ size: 4096, dynamic: true })}`)
            .setTitle(`Avatar of ${gMember.user.username}`),
    );

};

