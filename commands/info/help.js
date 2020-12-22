module.exports.run = async (client, message) => {
    const c = await JSON.stringify(Array.from(client.cmds)); message.channel.send(c);
};
