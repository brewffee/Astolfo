module.exports.run = async (message, args) => {
    if(message.author.id !== '548675133481418752') return;
    try {
      let evaled = eval(args.join(' '));
      typeof (evaled) !== 'string' ? evaled = require('util').inspect(evaled) : evaled = `'${evaled}'`;
      if (evaled.toString().length > 1950) {
        return message.channel.send(`pog \`\`\`js\n${evaled.toString().substr(0, 1950).replace(/`/g, '`\u200b').replace(/@/g, '@\u200b')}...\`\`\`\n\n (see console output)`);
      } else {
        return message.channel.send(`pog \`\`\`js\n${evaled.toString().replace(/`/g, '`\u200b').replace(/@/g, '@\u200b')}\`\`\``);
      }
    } catch (err) {
      return message.channel.send(`what the fuck \`\`\`js\n${err.toString().replace(/`/g, '`\u200b').replace(/@/g, '@\u200b')}\n\`\`\``);
    }
};