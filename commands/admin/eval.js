module.exports.run = async (message, args) => {
    if(message.author.id !== '548675133481418752') return;
    try {
      let res = eval(args.join(' '));
      typeof (res) !== 'string' ? res = require('util').inspect(res, { depth: 0 }) : res = `'${res}'`;
      if (res.toString().length > 1950) {
        return message.channel.send(`pog \`\`\`js\n${res.toString().substr(0, 1950).replace(/`/g, '`\u200b').replace(/@/g, '@\u200b')}...\`\`\`\n\n (see console output)`);
      } else {
        return message.channel.send(`pog \`\`\`js\n${res.toString().replace(/`/g, '`\u200b').replace(/@/g, '@\u200b')}\`\`\``);
      }
    } catch (err) {
      return message.channel.send(`what the fuck \`\`\`js\n${err.toString().replace(/`/g, '`\u200b').replace(/@/g, '@\u200b')}\n\`\`\``);
    }
};