module.exports.run = async (message) => {
    const config = require('../../config/config.json');
    message.channel.send(
        new (require('discord.js').MessageEmbed)()
            .setColor('#f7b2d9')
            .setTitle('Click here to invite me to your server!')
            .setURL('https://discord.com/api/oauth2/authorize?client_id=727367942525681704&scope=bot')
            .setFooter(`Astolfo ${config.version}`),
    );
};