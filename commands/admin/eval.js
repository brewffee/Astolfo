module.exports.run = async (message, args, flags) => {
  if (message.author.id !== '548675133481418752') {
    return message.channel.send(
      new (require('discord.js')).MessageEmbed()
        .setTitle('hmm')
        .setDescription('no'),
    );
  }
  try {
    const start = process.hrtime();
    let res = flags.sync ? eval(args.join(' ')) : await eval(`( async () => { return ${args.join(' ')}; })()`);
    typeof (res) !== 'string' ? res = require('util').inspect(res, { depth: 0 }) : res = `'${res}'`;
    if (res.toString().length > 1950) {
      const bin = await (require('sourcebin')).create([{ name: 'eval', content: res.toString().replace(message.client.token, 'no'), languageID: 'javascript' }]);
      return message.channel.send(
        new (require('discord.js')).MessageEmbed()
          .setTitle('Eval output is too large!')
          .setDescription(`Evaled contents exceeded the maximum of 2000 characters.\nClick [this link](${bin.url}) to see the full output.`),
      );
    } else {
      message.channel.send(
        new (require('discord.js')).MessageEmbed()
          .setTitle('Eval success!')
          .setDescription(`\`\`\`js\n${res.toString().replace(/`/g, '`\u200b').replace(message.client.token, 'no')}\`\`\``)
          .setFooter(`Took ${parseFloat((process.hrtime(start)[1] / 1000000).toFixed(2))}ms`),
      );
    }
  } catch (err) {
    message.channel.send(
      new (require('discord.js')).MessageEmbed()
        .setTitle('Eval failed!')
        .setDescription(`\`\`\`js\n${err.toString().replace(/`/g, '`\u200b')}\`\`\``),
    );
  }
};