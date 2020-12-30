module.exports.run = async (message, args, flags) => {
    const ms = require("ms"),
        time = ms(args[0]),
        config = require('../../config/config.json');
    if (!time) {
        message.channel.send(errorEmbed.setDescription('Invalid usage.\nUsage: `a!remind <ms> [--dm] <message>`'));
    } else if (time < 2147483647 && time > 999) {
        const setEmbed = new (require('discord.js')).MessageEmbed()
            .setTitle('Reminder set').setDescription(`You will be sent **"${args.slice(1).join(' ').replace(/`/g, '`\u200b')}"** in **${ms(time, { long: true })}**.`)
        if (config.debug) {
            message.channel.send(
                setEmbed.addField('Input',
                    `\`\`\`Message: ${message.content}\nReminder: ${args.slice(1).join(' ').replace(/`/g, '`\u200b')}\nTime: ${args[0]} [ms: ${ms(args[0])}]\nType: ${flags.dm ? 'DM' : "Channel"}\`\`\``)
            )
        } else { 
            message.channel.send(setEmbed);
        }
        setTimeout(() => { flags.dm ? message.author.send(args.slice(1).join(" ")) : message.channel.send(args.slice(1).join(" ")); }, time);
    } else {
        message.channel.send(errorEmbed.setDescription('Time must be more than `1s` and less than `25d`\nUsage: `a!remind <ms> [--dm] <message>`'));
    }
};
