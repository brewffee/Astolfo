module.exports.run = async (message, args) => {
    const Errors = require('../../util/Errors.js');
    const Discord = require('discord.js');
    try {
        if (!args[0]) Errors.throw('SayUsage', message.channel);
        message.delete().catch(() => null);
        return message.channel.send(
            new Discord.MessageEmbed()
                .setColor('#f7b2d9')
                .setDescription(args.join(' '))
                .setTimestamp()
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true })),
        );
    } catch (error) {
        return Errors.throw('Generic', message.channel);
    }
};