const Command = require('../../util/Command');

module.exports = new Command({
  name: 'eval',
  description: 'Evaluates JavaScript code.',
  usage: 'a!eval <code> [--return <any>]',
  access: {
    users: ['548675133481418752'],
  },
  run: async (message, args, flags) => {
    const Discord = require('discord.js');
    try {
      const start = process.hrtime();
      const res = require('util').inspect(
        (flags.return)
          ? await eval(`(async()=>{ ${args.join(' ')}; return ${flags.return}; })();`)
          : await eval(`(async()=>{ ${args.join(' ')}; })();`),
        { depth: 0 }).toString().replace(message.client.token, '').replace(/`/g, '`\u200b');
      const time = parseFloat((process.hrtime(start)[1] / 1000000).toFixed(2));
      const bin = (await (require('sourcebin')).create([{ name: 'eval', content: res, languageID: 'javascript' }])).url;

      (res.toString().length >= 2000)
        ? message.channel.send(
          new Discord.MessageEmbed()
            .setTitle('Eval output is too large!')
            .setDescription(`Evaled contents exceeded the maximum of 2000 characters.\nClick [this link](${bin}) to see the full output.`),
        )
        : message.channel.send(
          new Discord.MessageEmbed()
            .setTitle('Eval success!')
            .setDescription(`\`\`\`js\n${res}\`\`\``)
            .setFooter(`Took ${time}ms`),
        );
    } catch (error) {
      message.channel.send(
        new Discord.MessageEmbed()
          .setTitle('Eval failed!')
          .setDescription(`\`\`\`js\n${error.toString().replace(/`/g, '`\u200b')}\`\`\``),
      );
      }
  },
});