module.exports.run = async (message) => {
    const initial = await message.channel.send(
        new (require('discord.js').MessageEmbed)()
            .setDescription('Pinging... 📡'),
    );
    initial.edit(
        new (require('discord.js').MessageEmbed)()
            .setColor('#f7b2d9')
            .setDescription(`Pong! Latency is ${initial.createdTimestamp - message.createdTimestamp}ms, heartbeat ${message.client.ws.ping}ms.`),
    );
};
