module.exports.run = async (message, args, flags) => {
  const config = require('../../config/config.json'),
    changelog = require('../../logs/entries.json'),
    latest = 'b202';

  args[1] || Object.keys(flags).length > 1
    ? message.channel.send(
      new (require('discord.js').MessageEmbed)()
        .setTitle('Uh oh!')
        .setDescription('Invalid usage.\nUsage: `a!changelog [--latest | --version=<version>]`'),
    )
    : (
      Object.keys(flags).length === 1
        ? (
          flags.latest
            ? (
              Object.keys(flags.latest).length >= 1
                ? message.channel.send(
                  new (require('discord.js').MessageEmbed)()
                    .setTitle('Uh oh!')
                    .setDescription('Invalid usage.\nUsage: `a!changelog [version | --latest | --version=<version>]`'),
                )
                : (
                  changelog.entry[flags.latest]
                    ? message.channel.send(
                      new (require('discord.js')).MessageEmbed()
                        .setTitle(changelog.entry[latest].date)
                        .addField(changelog.entry[latest].head, changelog.entry[latest].body)
                        .setFooter(`Astolfo ${config.version}`),
                    )
                    : message.channel.send(
                      new (require('discord.js').MessageEmbed)()
                        .setTitle('Uh oh!')
                        .setDescription('The current version does not have a changelog entry associated with it.'),
                    )
                )
            )
            : (
              flags.version
                ? (
                  Object.keys(flags.version).length >= 1
                    ? (
                      changelog.entry[flags.version]
                        ? message.channel.send(
                          new (require('discord.js')).MessageEmbed()
                            .setTitle(changelog.entry[flags.version].date)
                            .addField(changelog.entry[flags.version].head, changelog.entry[flags.version].body)
                            .setFooter(`Astolfo ${config.version}`),
                        )
                        : (
                          /^b\d{3}$/.test(flags.version)
                            ? message.channel.send(
                              new (require('discord.js').MessageEmbed)()
                                .setTitle('Uh oh!')
                                .setDescription('The given version is either undocumented, unreleased, or does not exist.'),
                            )
                            : message.channel.send(
                              new (require('discord.js').MessageEmbed)()
                                .setTitle('Uh oh!')
                                .setDescription('Invalid usage.\nUsage: `a!changelog [version | --latest | --version=<version>]`'),
                            )
                        )
                    )
                    : message.channel.send(
                      new (require('discord.js').MessageEmbed)()
                        .setTitle('Uh oh!')
                        .setDescription('Invalid usage.\nUsage: `a!changelog [version | --latest | --version=<version>]`'),
                    )
                )
                : message.channel.send(
                  new (require('discord.js').MessageEmbed)()
                    .setTitle('Uh oh!')
                    .setDescription('Invalid usage.\nUsage: `a!changelog [version | --latest | --version=<version>]`'),
                )
            )
        )
        : (
          args[0]
            ? (
              changelog.entry[args[0]]
                ? message.channel.send(
                  new (require('discord.js')).MessageEmbed()
                    .setTitle(changelog.entry[args[0]].date)
                    .addField(changelog.entry[args[0]].head, changelog.entry[args[0]].body)
                    .setFooter(`Astolfo ${config.version}`),
                )
                : (
                  /^b\d{3}$/.test(args[0])
                    ? message.channel.send(
                      new (require('discord.js').MessageEmbed)()
                        .setTitle('Uh oh!')
                        .setDescription('The given version is either undocumented, unreleased, or does not exist.'),
                    )
                    : (
                      /latest/.test(args[0])
                        ? message.channel.send(
                          new (require('discord.js').MessageEmbed)()
                            .setTitle('Uh oh!')
                            .setDescription('The current version does not have a changelog entry associated with it.'),
                        )
                        : message.channel.send(
                          new (require('discord.js').MessageEmbed)()
                            .setTitle('Uh oh!')
                            .setDescription('Invalid usage.\nUsage: `a!changelog [version | --latest | --version=<version>]`'),
                        )
                    )
                )
            )
            : message.channel.send(
              new (require('discord.js')).MessageEmbed()
                .setTitle(changelog.entry[latest].date)
                .addField(changelog.entry[latest].head, changelog.entry[latest].body)
                .setFooter(`Astolfo ${config.version}`),
            )
        )
    );
};