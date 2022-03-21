const Command = require('../../util/Command');
const Discord = require('discord.js');
const fs = require('fs');

module.exports = new Command({
  name: 'hc',
  description: 'Help command test',
  usage: 'a!hc',
  run: async (message, args, flags) => {
    const groups = ['Image', 'Moderation', 'NSFW', 'Utility'];
    const embed = new Discord.MessageEmbed({
      color: '#f7b2d9',
      title: 'Help',
      description: 'description'
    });
    if (args[1]) return message.channel.send('UsageError');
    if (args[0]) {
      if (!new RegExp(groups.join('|'), 'i').test(args[0])) return message.channel.send('GroupError');
      const matched = groups.join(' ').match(new RegExp(args[0], 'i')).toString();
      const files = fs.readdirSync(`./commands/${matched.toLowerCase()}`).filter((f) => f.endsWith('js'));
      let data = '';
      files.forEach((file) => {
        console.log(file);
        const command = require(`../../commands/${matched.toLowerCase()}/${file}`);
        data += (`\u200b    **${command.name}** - ${command.description}\n`)
      });
      return message.channel.send(embed.setTitle(`Help - ${matched}`).setDescription(data))
    } else {
      groups.forEach(group => embed.addField(group, `a!help ${group.toLowerCase()}`, true));
      return message.channel.send(embed);
    }
  },
});
new RegExp().test()
