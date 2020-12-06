module.exports.run = async (client, message) => {
    const em = require('discord.js').MessageEmbed,
        ms = require('ms'),
        embed = new em().setColor('#f7b2d9');
    message.channel.send(embed.setDescription(`It has been **${ms(client.uptime, { long: true })}** since the last restart`));
};
