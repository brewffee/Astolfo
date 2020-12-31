module.exports.run = async (message, args) => {
    if (!args[0]) {
        return message.channel.send(
            new (require('discord.js').MessageEmbed)()
                .setColor('#f7b2d9')
                .setTitle('Uh oh!')
                .setDescription('Invalid arguments given.\nUsage: `a!say <text>`'),
        );
    }
    if (message.guild.me.hasPermission('MANAGE_MESSAGES')) {
        message.delete();
    }
    return message.channel.send(
        new (require('discord.js').MessageEmbed)()
            .setColor('#f7b2d9')
            .setDescription(`"${args.join(' ').replace(/`/g, '`\u200b')}"`)
            .setFooter(
                `${message.author.username}`,
                `${message.author.displayAvatarURL()}`,
            ),
    );
};
