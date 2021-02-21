module.exports.run = async (message, args) => {
    const Errors = require('../../util/Errors.js');
    const Discord = require('discord.js');
    try {
        if (args[1]) null; // Errors.throw('NekoUsage', message.channel);
        const { image } = (await (await require('node-fetch')(`https://api.tenor.com/v1/random?key=${process.env.API_TENOR}&locale=en_US&q=dog&limit=1`)).json());
        message.channel.send(
            new Discord.MessageEmbed()
                .setTitle('Nekos!')
                .setColor(16233177)
                .setURL(image)
                .setImage(image)
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true })),
        );
    } catch (error) {
        Errors.throw('Generic', message.channel);
    }
};