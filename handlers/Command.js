const fs = require('fs');

module.exports.load = (client) => {
    const folders = fs.readdirSync('./commands/').filter((f) => fs.statSync(`./commands/${f}`).isDirectory())
    folders.forEach((folder) => {
        const files = fs.readdirSync(`./commands/${folder}`).filter((f) => f.endsWith('js'));
        files.forEach((file) => {
            const command = require(`../commands/${folder}/${file}`);
            console.log(`\x1b[32;10m[ OK ] \x1b[0mLoaded command \x1b[33;10m${folder.toUpperCase()}:${command.name?.toUpperCase()}\x1b[0m!`);
            client.commands.set(command.name, command);
        });
    });
};
/*
const Command = require('../../util/Command');

module.exports = new Command({
  name: 'eval',
  description: 'Evaluates JavaScript code.',
  usage: 'a!eval <code> [--return <any>]',
  cooldown: false, // either false or an int
  access: {
    guildOnly: false,
    guilds: ['761203866732724225'],
    roles: ['784916766496260126'],
    permissions: ['MANAGE_MESSAGES'],
    users: ['548675133481418752'],
  },

  run: async (message, args, flags) => {
    const Discord = require('discord.js');
    try {
      if (message.author.id !== '548675133481418752') return;
      const start = process.hrtime();
      const res = require('util').inspect(
        (flags.return)
          ? await eval(`(async()=>{ ${args.join(' ')}; return ${flags.return}; })();`)
          : await eval(`(async()=>{ return ${args.join(' ')}; })();`),
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
*/