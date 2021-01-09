module.exports.run = async (message) => {
    require('node-fetch')('http://api.nekos.fun:8080/api/neko')
        .then((r) => r.json())
        .then((b) => {
            message.channel.send(
                new (require('discord.js')).MessageEmbed()
                .setTitle('Nekos!')
                .setURL(b.image)
                .setImage(b.image)
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true })),
            );
        });
};