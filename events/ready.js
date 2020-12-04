module.exports = (client) => {
    const config = require('../config/config.json'),
        { con, net, ev } = require('../config/language.json');
    client.user.setActivity('fate', {
        type: 'WATCHING',
    });
    setTimeout(() => { console.log(`${con.OK}${net.complete}`); }, 3300);
    setTimeout(() => { console.log(`${con.OK}${ev.ready[0]}${config.version}${ev.ready[1]}`); }, 5000);
    setTimeout(() => { console.log(`${con.OK}${ev.listening[0]}${client.guilds.cache.size}${ev.listening[1]}${con.LINE}`); }, 5700);
};