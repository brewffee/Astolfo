const Command = require('../../util/Command');
const Errors = require('../../util/Errors.js');
const Discord = require('discord.js');
const ms = require('ms');
module.exports = new Command({
  name: 'remind',
  description: 'it is time for your daily dick flattening',
  usage: 'a!eval <code> [--return <any>]',
  args: [],
  run: async (message, args, flags) => {
    try {
      if (!args[0] || !args[1] || flags['dm']?.length >= 0 || (Object.keys(flags).length > 0 && !flags.dm)) return Errors.throw('RemindUsage', message.channel);
      const time = ms(args[0]);
      if (!time) return Errors.throw('RemindUsage', message.channel);
      if (time >= 2147483647 || time <= 999) return Errors.throw('RemindTime', message.channel);
      const setEmbed = new Discord.MessageEmbed()
        .setColor('#f7b2d9')
        .setTitle('Reminder set')
        .setDescription(`You will be sent **"${args.slice(1).join(' ').replace(/`/g, '`\u200b')}"** in **${ms(time, { long: true })}**.`)
        .setTimestamp(Date.now() + time);
      message.channel.send(setEmbed);
      setTimeout(() => {
        (flags.dm)
          ? message.author.send(args.slice(1).join(' '))
          : message.channel.send(args.slice(1).join(' '), { allowedMentions: { everyone: false, users: [message.author.id] } });
      }, time);
    } catch (error) {
      console.log(error);
    }
  },
});