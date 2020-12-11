module.exports.run = async (client, message, args) => {
    const config = require('../../config/config.json'),
        changelog = require('../../logs/entries.json'),
        latest = 'b119';
    try {
        message.channel.send(
            new (require('discord.js').MessageEmbed)()
                .setTitle(changelog.entry[args[0]].date)
                .addField(changelog.entry[args[0]].head, changelog.entry[args[0]].body)
                .setFooter(`Astolfo ${config.version}`),
        );
    } catch {
        if (!args[0]) {
            message.channel.send(
                new (require('discord.js').MessageEmbed)()
                    .setTitle(changelog.entry[latest].date)
                    .addField(changelog.entry[latest].head, changelog.entry[latest].body)
                    .setFooter(`Astolfo ${config.version}`),
            );

        } else {
            message.channel.send(
                new (require('discord.js').MessageEmbed)()
                    .setTitle('Uh oh!')
                    .setDescription('Could not find an entry with that version!'),
            );
        }


    }
};