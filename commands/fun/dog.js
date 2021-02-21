module.exports.run = async (message) => {
    const Errors = require('../../util/Errors.js');
    const Discord = require('discord.js');
    try {
        const { gif } = (await (await require('node-fetch')(`https://api.tenor.com/v1/random?key=${process.env.API_TENOR}&locale=en_US&q=dog&limit=1`)).json()).results[0].media[0];
        message.channel.send(
            new Discord.MessageEmbed()
                .setColor('#f7b2d9')
                .setTitle('Woof :dog2:')
                .setImage(gif.url)
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true })),
        );
    } catch (error) {
        Errors.throw('DogNotFound', message.channel);
    }
};