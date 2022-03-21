const Errors = require('../../util/Errors.js');
const Discord = require('discord.js');
const Command = require('../../util/Command');

module.exports = new Command({
  name: 'gif',
  description: 'Searches for gifs.',
  usage: 'a!gif <query>',
  args: [
    { name: 'query', optional: false, type: 'string' }
  ],
  run: async (message, args, flags) => {
    try {
      if (!args[0]) return Errors.throw('GifUsage', message.channel);
      const { gif } = (await (await require('node-fetch')(`https://api.tenor.com/v1/random?key=${process.env.API_TENOR}&locale=en_US&q=${args.join('%20')}&limit=1`)).json()).results[0].media[0];
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#f7b2d9')
          .setTitle(`Result for '${args.join(' ')}'`)
          .setImage(gif.url)
          .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true })),
      );
    } catch (error) {
      return Errors.throw('GifQuery', message.channel);
    }
  },
});