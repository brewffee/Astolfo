const Command = require('../../util/Command');

module.exports = new Command({
  name: 'help',
  description: 'dumps all the commands lol',
  usage: 'a!eval <code> [--return <any>]',
  args: [],
  cooldown: 2000,
  run: async (message, args, flags) => {
    message.channel.send(
      Array.from(message.client.commands)
        .toString()
        .replace(/\[object Object],|,\[object Object]$/g, ' '),
    );
  },
});