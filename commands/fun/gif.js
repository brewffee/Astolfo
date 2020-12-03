module.exports.run = async (client, message, args) => {
    const fetch = require('node-fetch'),
        auth = require('../../auth/auth.json'),
        { MessageEmbed } = require('discord.js');
    fetch(`https://api.tenor.com/v1/random?key=${auth.api.key.tenor}&locale=en_US&q=${args.join('%20')}&limit=1`)
        .then(r => r.json())
        .then(q => message.channel.send(
            new MessageEmbed()
                .setColor('#f7b2d9')
                .setTitle(`Result for '${args.join(' ')}'`)
                .setImage(q.results[0].media[0].gif.url)
                .setFooter(`Requested by ${message.author.username}`),
        ),
        )
        .catch(e => {
            console.log(e);
            if (e.toString().startsWith('TypeError: Cannot read property \'media\' of undefined')) {
                return message.channel.send(
                    new MessageEmbed()
                        .setColor('#f7b2d9')
                        .setTitle('Uh oh!')
                        .setDescription('Failed to find a gif that matched your query!'),
                    );
            } else {
                return message.channel.send(
                    new MessageEmbed()
                        .setColor('#f7b2d9')
                        .setTitle('Uh oh!')
                        .setDescription('An error occured whilst running this command!'),
                );
            }
        });
};

