module.exports.run = async (message, args) => {
    if (!args[0] || !args[0].startsWith('--')) {
        message.channel.send(
            new (require('discord.js').MessageEmbed)()
                .setDescription('Hi! I am a template command.'),
        );
        return;
    } else if (args[0].startsWith('--')) {
        const flag = args[0].replace('--', '');
        if (flag == 'hi') {
            message.channel.send(
                new (require('discord.js').MessageEmbed)()
                    .setDescription('Hello! I am a template command.'),
            );
            return;
        } else if (flag == '') {
            message.channel.send(
                new (require('discord.js').MessageEmbed)()
                    .setDescription(':thinking:'),
            );
            return;
        }
    }
};