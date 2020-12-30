module.exports.run = async (message) => {
  const config = require("../../config/config.json");
  message.channel.send(
    new (require("discord.js").MessageEmbed)()
      .setTitle("v4 Development Progress")
      .addField(
        "Implemented Features",
        "reminders, flags, softban, unban, v4ban, v4kick, v4gif (generic, cat, dog), upcoming, changelog, v3avatar, v3invite, v4say, v4ping, cleanchangelog"
      )
      .addField(
        "Planned Features",
        "nick, purge, nekos (local db), mute, warn, promote, demote, v3commands, v4help, welcomer, music, osu, hentai"
      )
      .setFooter(`Astolfo ${config.version}`)
  );
};
