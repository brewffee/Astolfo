module.exports.run = async (message, args) => {
    const Errors = require('../../util/Errors.js');
    const Users = require('../../util/Users.js');
    const Discord = require('discord.js');
    try {
        if (args[1]) return Errors.throw('AvatarUsage', message.channel);
        const member = args[0] ? await Users.fetch(args[0], message.client) : message.author;
        message.channel.send(
            new Discord.MessageEmbed()
                .setColor('#f7b2d9')
                .setImage(member.displayAvatarURL({ size: 4096, dynamic: true }))
                .setTitle(`Avatar of ${member.username}`)
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true })),
        );
    } catch (error) {
        console.log(error);
    }
};