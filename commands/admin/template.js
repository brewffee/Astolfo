module.exports.run = async (message, args, flags) => {
  if (!args[0] || !args[0].startsWith('--')) {
    return message.channel.send(
      new (require('discord.js').MessageEmbed)().setDescription('Hi! I am a template command.'),
    );
  } else if (flags.hi) {
      return message.channel.send(
        new (require('discord.js').MessageEmbed)().setDescription('Hello! I am a template command.'),
      );
    } else {
      return message.channel.send(
        new (require('discord.js').MessageEmbed)().setDescription(':thinking:'),
      );
    }
};