module.exports = (client, message) => {
  const config = require("../config/config.json"),
    args = message.content
      .slice(config.prefix.length)
      .trim()
      .split(/ +/g)
      .filter((a) => !/^--(.*)/.test(a)),
    command = client.cmds.get(args.shift().toLowerCase()),
    flags = {};
  message.content
    .toLowerCase()
    .split(" ")
    .forEach((flag) => {
      const match = flag.match(/^--(.*)/);
      if (match) {
        flags[match[1].split("=")?.[0] || match[1]] =
          match[1].split("=")?.[1] || true;
      }
    });
  if (
    message.author.bot ||
    !message.content.indexOf(config.prefix.toLowerCase()) === 0 ||
    !command
  )
    return;

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
