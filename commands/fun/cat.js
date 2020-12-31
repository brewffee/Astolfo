module.exports.run = async (message) => {
    require('node-fetch')(`https://api.tenor.com/v1/random?key=${require('../../auth/auth.json').api.key.tenor}&locale=en_US&q=cat&limit=1`)
        .then((r) => r.json())
        .then((q) =>
            message.channel.send(
                new (require('discord.js').MessageEmbed)()
                    .setColor('#f7b2d9')
                    .setTitle('Meow :cat2:')
                    .setImage(q.results[0].media[0].gif.url)
                    .setFooter(`Requested by ${message.author.username}`),
            ),
        )
        .catch((e) => {
            console.log(e);
            if (e.toString().startsWith('TypeError: Cannot read property \'media\' of undefined')) {
                return message.channel.send(
                    new (require('discord.js').MessageEmbed)()
                        .setColor('#f7b2d9')
                        .setTitle('Uh oh!')
                        .setDescription('Unable to find a kitty!'),
                );
            } else {
                return message.channel.send(
                    new (require('discord.js').MessageEmbed)()
                        .setColor('#f7b2d9')
                        .setTitle('Uh oh!')
                        .setDescription('An error occured whilst running this command!'),
                );
            }
        });
};
