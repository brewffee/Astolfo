module.exports.run = async (message) => {
  const config = require('../../config/config.json');
  const features = ['- nick', '- purge', '- mute', '- warn', '- promote', '- demote', '- v3commands', '- v4help', '- welcomer', '- music', '- osu', '- hentai', '- anime gifs'];
  message.channel.send(
    new (require('discord.js').MessageEmbed)()
      .setTitle('v4 Upcoming Features')
      .addField(
        'Planned Features',
        features.join('\n'),
      )
      .setFooter(`Astolfo ${config.version}`),
  );
};