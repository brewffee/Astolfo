module.exports.run = async (message, args) => {
    const Errors = require('../../util/Errors.js');
    const Discord = require('discord.js');
    try {
        if (!args[0]) return Errors.throw('GifUsage', message.channel);
        const { gif } = (await (await require('node-fetch')(`https://api.tenor.com/v1/random?key=${process.env.API_TENOR}&locale=en_US&q=${args.join('%20')}&limit=1`)).json()).results[0].media[0];
        return message.channel.send(
            new Discord.MessageEmbed()
                .setColor('#f7b2d9')
                .setTitle(`Result for '${args.join(' ')}'`)
                .setImage(gif.url)
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true })),
        );
    } catch (error) {
        return Errors.throw('GifQuery', message.channel);
    }
};