module.exports.run = async (message) => {
  const Discord = require('discord.js');
  const config = require('../../config/config.json');
  try {
    message.channel.send(
      new Discord.MessageEmbed()
        .setColor('#f7b2d9')
        .setTitle('Click here to invite me to your server!')
        .setURL('https://discord.com/api/oauth2/authorize?client_id=727367942525681704&scope=bot')
        .setFooter(`Astolfo ${config.version}`),
    );
  } catch (error) {
    console.log(error);
  }
};