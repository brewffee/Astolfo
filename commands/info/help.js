module.exports.run = async (client, message) => {
    let cmds = await JSON.stringify(Array.from(client.commandMap));
    message.channel.send(cmds);
};
