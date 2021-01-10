/* eslint-disable no-shadow */
module.exports = (client, message) => {
  const config = require('../config/config.json'),
    args = message.content.slice(config.prefix.length).trim().split(/ +/g).filter((a) => !/^--(.*)/.test(a)),
    command = client.cmds.get(args.shift().toLowerCase()),
    flags = message.content.toLowerCase().split(/ +/g).reduce((flags, flag) => {
        const match = /^--([^=]+)(?:=(.*))?/.exec(flag);
        if (match) flags[match[1]] = match[2] ?? true;
        return flags;
      }, {});
  if (message.author.bot || !message.content.startsWith(config.prefix.toLowerCase()) || !command) return;

  if (config.debug) {
    const { con } = require('../config/language.json');
    let cmd;
    if (!args[0]) {
      cmd = message.content;
      console.log(`${con.R}Request: "${cmd}"`);
    } else {
      cmd = message.content.substr(0, message.content.indexOf(' '));
      console.log(`\x1b[36;10m${con.R}\x1b[0mRequest: \x1b[32;10m"${cmd}"\x1b[0m, \x1b[32;10m"${args.join(' ').replace(/\n/g, '\x1b[36;10m\\n\x1b[32;10m')}"\x1b[0m`);
    }
  }

  command.run(message, args, flags);
};