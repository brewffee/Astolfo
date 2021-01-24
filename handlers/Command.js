module.exports.load = (client) => {
    const config = require('../config/config.json'),
    { con } = require('../config/language.json');
    require('fs').readdirSync('./commands/').forEach((group) => {
        require('fs').readdirSync(`./commands/${group}`).filter((s) => s.endsWith('js') || s.startsWith(config.disablePrefix)).forEach((command) => {
            console.log(`\x1b[32;10m${con.OK}\x1b[0mLoaded command \x1b[33;10m${group.toUpperCase()}:${command.split('.')[0].toUpperCase()}\x1b[0m!`);
            client.commands.set(command.split('.')[0], require(`../commands/${group}/${command}`));
        });
    });
};