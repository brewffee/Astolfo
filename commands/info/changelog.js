module.exports.run = async (message, args) => {
    const config = require('../../config/config.json'),
        changelog = require('../../logs/entries.json'),
        latest = 'b151';
        message.channel.send(`version ${config.version.substr(config.version.indexOf('-') + 1)}, args ${args[0]}, latest ${latest}`);
    try {
        message.channel.send(
            new (require('discord.js').MessageEmbed)()
                .setTitle(changelog.entry[args[0]].date)
                .addField(changelog.entry[args[0]].head, changelog.entry[args[0]].body)
                .setFooter(`Astolfo ${config.version}`),
        );
    } catch {
        if (!args[0] || args[0] == 'latest') {
            message.channel.send(
                new (require('discord.js').MessageEmbed)()
                    .setTitle(changelog.entry[latest].date)
                    .addField(changelog.entry[latest].head, changelog.entry[latest].body)
                    .setFooter(`Astolfo ${config.version}`),
            );

        } else if (args[0] == config.version.substr(config.version.indexOf('-') + 1) && config.version != latest) {
            message.channel.send(
                new (require('discord.js').MessageEmbed)()
                    .setTitle('Uh oh!')
                    .setDescription('This version is a testing release and has not been documented yet.'),
            );
        } else if (args[1] || !/^b\d{3}$/.test(args[0])) {
            message.channel.send(
                new (require('discord.js').MessageEmbed)()
                    .setTitle('Uh oh!')
                    .setDescription('Invalid usage'),
            );
        } else {
            message.channel.send(
                new (require('discord.js').MessageEmbed)()
                    .setTitle('Uh oh!')
                    .setDescription('The given version is either invalid, undocumented, or unreleased.'),
            );
        }


    }
};