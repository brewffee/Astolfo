module.exports.run = async (message, args, flags) => {
  if (!args[0] || !args[0].startsWith("--")) {
    message.channel.send(
      new (require("discord.js").MessageEmbed)().setDescription(
        "Hi! I am a template command."
      )
    );
    return;
  } else {
    if (flags.hi) {
      message.channel.send(
        new (require("discord.js").MessageEmbed)().setDescription(
          "Hello! I am a template command."
        )
      );
      return;
    } else {
      message.channel.send(
        new (require("discord.js").MessageEmbed)().setDescription(":thinking:")
      );
      return;
    }
  }
};
