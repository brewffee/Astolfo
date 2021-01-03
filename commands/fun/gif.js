module.exports.run = async (message, args) => {
  if (args.join(' ').length < 1) {
    return message.channel.send(
      new (require('discord.js').MessageEmbed)()
        .setColor('#f7b2d9')
        .setTitle('Uh oh!')
        .setDescription('Invalid usage.\nUsage: `a!gif <query>`'),
    );
  }
  require('node-fetch')(`https://api.tenor.com/v1/random?key=${process.env.API_TENOR}&locale=en_US&q=${args.join('%20')}&limit=1`)
    .then((r) => r.json())
    .then((q) =>
      message.channel.send(
        new (require('discord.js').MessageEmbed)()
          .setColor('#f7b2d9')
          .setTitle(`Result for '${args.join(' ')}'`)
          .setImage(q.results[0].media[0].gif.url)
          .setFooter(`Requested by ${message.author.username}`),
      ),
    )
    .catch((e) => {
      console.log(e);
      if (e.toString().startsWith('TypeError: Cannot read property \'media\' of undefined')) {
        return message.channel.send(
          new (require('discord.js').MessageEmbed)()
            .setColor('#f7b2d9')
            .setTitle('Uh oh!')
            .setDescription('Failed to find a gif that matched your query!'),
        );
      } else {
        return message.channel.send(
          new (require('discord.js').MessageEmbed)()
            .setColor('#f7b2d9')
            .setTitle('Uh oh!')
            .setDescription('An error occured whilst running this command!'),
        );
      }
    });
};