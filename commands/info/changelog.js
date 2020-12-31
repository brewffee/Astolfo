module.exports.run = async (message, args, flags) => {
  const config = require('../../config/config.json'),
    changelog = require('../../logs/entries.json'),
    latest = 'b181';
  try {
    message.channel.send(
      new (require('discord.js')).MessageEmbed()
        .setTitle(changelog.entry[args[0]].date)
        .addField(changelog.entry[args[0]].head, changelog.entry[args[0]].body)
        .setFooter(`Astolfo ${config.version}`),
    );
  } catch {
    if ((!args[0] && !flags['latest']) || flags.latest) {
      message.channel.send(
        new (require('discord.js').MessageEmbed)()
          .setTitle(changelog.entry[latest].date)
          .addField(changelog.entry[latest].head, changelog.entry[latest].body)
          .setFooter(`Astolfo ${config.version}`),
      );
    } else if (
      args[0] == config.version.substr(config.version.indexOf('b')) &&
      config.version != latest
    ) {
      message.channel.send(
        new (require('discord.js').MessageEmbed)()
          .setTitle('Uh oh!')
          .setDescription(
            'This version is a testing release and has not been documented yet.',
          ),
      );
    } else if (args[1] || !/^b\d{3}$/.test(args[0])) {
      message.channel.send(
        new (require('discord.js').MessageEmbed)()
          .setTitle('Uh oh!')
          .setDescription('Invalid usage'),
      );
    } else {
      message.channel.send(
        new (require('discord.js').MessageEmbed)()
          .setTitle('Uh oh!')
          .setDescription(
            'The given version is either invalid, undocumented, or unreleased.',
          ),
      );
    }
  }
};
