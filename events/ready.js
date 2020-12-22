module.exports = (client) => {
    const config = require('../config/config.json'),
        { con, net, ev } = require('../config/language.json'),
        Discord = require('discord.js');
    client.user.setActivity('fate', {
        type: 'WATCHING',
    });
    client.guilds.cache.get('761203866732724225').channels.cache.get('787087630390919228').send(
        new Discord.MessageEmbed().setTitle('Astolfo is online!').setDescription(`Listening on ${client.guilds.cache.size} guilds!`).setColor('GREEN').setFooter(config.version),
    );
    setTimeout(() => { console.log(`${con.OK}${net.complete}`); }, 3300);
    setTimeout(() => { console.log(`${con.OK}${ev.ready[0]}${config.version}${ev.ready[1]}`); }, 5000);
    setTimeout(() => { console.log(`${con.OK}${ev.listening[0]}${client.guilds.cache.size}${ev.listening[1]}${con.LINE}`); }, 5700);
};