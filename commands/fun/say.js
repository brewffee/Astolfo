module.exports.run = async (message, args) => {
    if (!args[0]) {
        return message.channel.send(
            new (require('discord.js')).MessageEmbed()
                .setColor('#f7b2d9')
                .setTitle('Uh oh!')
                .setDescription('Invalid arguments given.\nUsage: `a!say <text>`'),
        );
    }
    if (message.guild?.me.hasPermission('MANAGE_MESSAGES')) {
        message.delete();
    }
    return message.channel.send(
        new (require('discord.js')).MessageEmbed()
            .setColor('#f7b2d9')
            .setDescription(args.join(' '))
            .setTimestamp()
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true })),
    );
};