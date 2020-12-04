module.exports.run = async (client, message) => {
    const { MessageEmbed } = require('discord.js'),
        config = require('../../config/config.json');
    message.channel.send(
        new MessageEmbed()
            .setTitle('v4 Development Progress')
            .addField('Implemented Features', 'v4ban, v4kick, v4gif (generic, cat, dog), upcoming, changelog, v3avatar')
            .addField('Planned Features', 'nekos (local db), mute, warn, softban, promote, demote, v3commands, v4help, welcomer, v4ping, music, cleanchangelog')
            .setFooter(`Astolfo ${config.version}`),
    );

};