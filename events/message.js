module.exports = (client, message) => {
  const config = require("../config/config.json"),
    args = message.content.slice(config.prefix.length).trim().split(/ +/g).filter((a) => !/^--(.*)/.test(a)),
    command = client.cmds.get(args.shift().toLowerCase()),
    flags = message.content.toLowerCase().split(/ +/g).reduce((flags, flag) => {
        const match = /^--([^=]+)(?:=(.*))?/.exec(flag);
        if (match) flags[match[1]] = match[2] ?? true;
        return flags;
      }, {});
  if (message.author.bot || !message.content.indexOf(config.prefix.toLowerCase()) === 0 || !command) return;
        
  if (config.debug) {
    const { con } = require("../config/language.json");
    let cmd;
    if (!args[0]) {
      cmd = message.content;
      console.log(`${con.R}Request: "${cmd}"`);
    } else {
      cmd = message.content.substr(0, message.content.indexOf(" "));
      console.log(`${con.R}Request: "${cmd}", "${args.join(" ")}"`);
    }
  }

  command.run(message, args, flags);
};
