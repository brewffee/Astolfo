module.exports.run = async (client, message) => {
    message.channel.send(
        (new (require('discord.js').MessageEmbed))
            .setColor('#f7b2d9')
            .setDescription(`Pingng... 📡`),
        ).then(m => {
            m.edit(
                (new (require('discord.js').MessageEmbed))
                .setColor('#f7b2d9')
                .setDescription(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms, heartbeat ${client.ws.ping}ms.`),
            )
        });
};
