module.exports.run = async (message, args) => {
    const ms = require('ms'),
        time = ms(args[1]);
    // current time + time = expiry date
    // send data to db
    // TEMPORARY METHOD
    message.channel.send(`request: send '${args[1]}' in ${args[0]} [ms: ${ms(args[0])}]`);
    if (!time) {
        message.channel.send('Please provide a correct time format!');
    } else if (time < ms('5 minutes')) {
        setTimeout(() => { message.channel.send(args[1]); }, time);
    } else {
        // 500ms interval to check if time is reached
    }
};
