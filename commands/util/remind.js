module.exports.run = async (message, args, flags) => {
  const ms = require("ms"),
    time = ms(args[0]);
  // current time + time = expiry date
  // send data to db
  // TEMPORARY METHOD
  message.channel.send(
    `Request: send '${args.slice(1).join(" ")}' in ${args[0]} [ms: ${ms(
      args[0]
    )}][${flags.dm ? " Type: DM" : ""}]`
  );
  if (!time) {
    message.channel.send("Please provide a correct time format!");
  } else if (time < ms("5 minutes")) {
    setTimeout(() => {
      flags.dm
        ? message.author.send(args.slice(1).join(" "))
        : message.channel.send(args.slice(1).join(" "));
    }, time);
  } else {
    // 500ms interval to check if time is reached
  }
};
