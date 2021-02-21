module.exports.run = async (message) => {
    const Errors = require('../../util/Errors.js');
    const Discord = require('discord.js');
    try {
        const { gif } = (await (await require('node-fetch')(`https://api.tenor.com/v1/random?key=${process.env.API_TENOR}&locale=en_US&q=cat&limit=1`)).json()).results[0].media[0];
        message.channel.send(
            new Discord.MessageEmbed()
                .setColor('#f7b2d9')
                .setTitle('Meow :cat2:')
                .setImage(gif.url)
                .setFooter(`Requested by ${message.author.username}`),
        );
    } catch (error) {
        Errors.throw('CatNotFound', message.channel);
    }
};