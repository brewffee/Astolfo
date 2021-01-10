module.exports.run = async (message) => {
    require('node-fetch')('http://api.nekos.fun:8080/api/hentai')
        .then((r) => r.json())
        .then((b) => {
            if (message.channel.nsfw) {
                return message.channel.send(
                    new (require('discord.js')).MessageEmbed()
                        .setTitle('what do i caption this lol')
                        .setColor(16233177)
                        .setURL(b.image)
                        .setImage(b.image)
                        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true })),
                );
            } else {
                return require('../../util/Errors.js').throw('NSFWOnly', message.channel);
            }

        });
};