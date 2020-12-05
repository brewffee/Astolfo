module.exports.run = async (client, message, args) => {
    const em = require('discord.js').MessageEmbed;
    if (!args[0]) {
        message.channel.send(
            new em()
                .setColor('#f7b2d9')
                .setDescription('Uh oh!')
                .setFooter('Invalid arguments given.\nUsage: `a!say <text>`'),
        );
    }
    if (message.guild.me.hasPermission('MANAGE_MESSAGES')) { message.delete(); }
    await message.channel.send(
        new em()
            .setColor('#f7b2d9')
            .setDescription(`"${args.join(' ')}"`)
            .setFooter(`${message.author.username}`, `${message.author.displayAvatarURL()}`),
    );

};