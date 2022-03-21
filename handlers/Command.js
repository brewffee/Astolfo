const fs = require('fs');

module.exports.load = (client) => {
  const folders = fs.readdirSync('./commands/').filter((f) => fs.statSync(`./commands/${f}`).isDirectory())
  folders.forEach((folder) => {
    const files = fs.readdirSync(`./commands/${folder}`).filter((f) => f.endsWith('js'));
    files.forEach((file) => {
      const command = require(`../commands/${folder}/${file}`);
      console.log(`\x1b[32;10m[ OK ] \x1b[0mLoaded command \x1b[33;10m${folder.toUpperCase()}:${command.name?.toUpperCase()}\x1b[0m!`);
      client.commands.set(command.name, command);
    });
  });
};
