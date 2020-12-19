module.exports.run = async (client, message) => {
    let cmds = await JSON.stringify(Array.from(client.cmds));
    message.channel.send(cmds);
};
