module.exports.run = async (client, message) => {
    const ms = require('ms'),
        e = (new (require('discord.js').MessageEmbed)).setColor('#f7b2d9');
    message.channel.send(e.setDescription(`It has been **${ms(client.uptime, { long: true })}** since the last restart`));
};
