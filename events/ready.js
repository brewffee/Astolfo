module.exports = (client) => {
    const config = require('../config/config.json'),
    { con, net, event } = require('../config/language.json');

    client.user.setActivity('fate', {
        type: 'WATCHING',
    });

    setTimeout(() => { console.log(`${con.OK}${net.complete}`); }, 3300);
    setTimeout(() => { console.log(`${con.OK}${event.ready[0]}${config.version}${event.ready[1]}`); }, 5000);
    setTimeout(() => { console.log(`${con.OK}${event.listening[0]}${client.guilds.cache.size}${event.listening[1]}${con.LINE}`); }, 5700);
};