module.exports.load = (client) => {
    const config = require('../config/config.json');
    require('fs').readdirSync('./events/').filter((s) => s.endsWith('js') || s.startsWith('-')).forEach((event) => {
        console.log(`\x1b[32;10m[ OK ] \x1b[0mLoaded event \x1b[33;10m${event.split('.')[0].toUpperCase()}\x1b[0m!`);
        client.on(event.split('.')[0], (require(`../events/${event}`)).bind(null, client));
    });
};