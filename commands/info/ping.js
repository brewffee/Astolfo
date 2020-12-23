module.exports.run = async (message) => {
    message.channel.send(
        (new (require('discord.js').MessageEmbed))
            .setDescription('Pinging... 📡'),
    ).then(m => {
        m.edit(
            (new (require('discord.js').MessageEmbed))
                .setColor('#f7b2d9')
                .setDescription(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms, heartbeat ${message.client.ws.ping}ms.`),
        );
    });
};
