/* eslint-disable no-shadow */
const config = require('../config/config.json');
const Errors = require('../util/Errors');
const { Permissions } = require('discord.js');
module.exports = async (client, message) => {
  if (message.channel.id === '823214924263981106') return;
  console.log(
    `<${message.author.username}> [${message.guild?.name || 'DM'} -> ${('#' + message.channel.name) || 'DmChannel'}]: ${message.content}` +
    `${message.embeds[0] ? `[Embeds{${message.embeds.length}}]` : ''}`
  )
  if (message.author.bot || !message.content.toLowerCase().startsWith(config.prefix)) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g).filter((a) => !/^--(.*)/.test(a));
  const command = client.commands.get(args.shift()?.toLowerCase());
  if (!command) return;
  const flags = message.content.toLowerCase().split(/ +/g).reduce((flags, flag) => {
    const match = /^--([^=]+)(?:=(.*))?/.exec(flag);
    if (match) flags[match[1]] = match[2] ?? true;
    return flags;
  }, {});
  try {
    if (command.access?.guildOnly && !message.guild) {
      console.log('Guild Only check');
      Errors.throw('GuildOnly', message.channel);
      throw new Error;
    }
    if (command.access?.guilds) {
      console.log('Guild access check');
      if (!command.access?.guilds.includes(message.guild.id)) {
        Errors.throw('Unauthorized', message.channel);
        throw new Error;
      }
      // Throw error of type 'Unauthorized' later.
    }
    if (command.access?.roles) {
      console.log('Role access check');
      command.access?.roles.forEach((role) => {
        if (!message.member.roles.cache.has(role)) {
          Errors.throw('Unauthorized', message.channel);
          throw new Error;
        }
      });
      // Throw error of type 'Unauthorized' later. 
    }
    if (command.access?.permissions) {
      console.log('Member permissions check');
      command.access?.permissions.forEach((permission) => {
        if (!message.member.permissions.has(permission)) {
          Errors.throw('Unauthorized', message.channel);
          throw new Error;
        }
      });
      // Throw error of type 'Unauthorized' later.
    }
    if (command.access?.users) {
      console.log('User access check');
      if (!command.access?.users.includes(message.author.id)) return Errors.throw('Unauthorized', message.channel);
      // Throw error of type 'Unauthorized' later.
    }
    if (command.permissions) {
      console.log('Client permissions check');
      command.access?.permissions.forEach((permission) => {
        if (!message.member.permissions.has(permission)) {
          Errors.throw('Unauthorized', message.channel);
          throw new Error;
        }
      });
      // Throw error of type 'Unauthorized' later.
    }
  } catch (error) {
    return console.error(error);
  }
  console.log(`Running command [${command.name}]`);
  console.log(`> Guild: ${message?.guild}`);
  console.log(`> Channel: ${message?.channel?.name}`);
  console.log(`> Permissions`);
  if (message.guild) {
    Object.keys(Permissions.FLAGS).forEach((flag) => {
      console.log(` - [${flag}]: ${message.channel.permissionsFor(message.guild.me).has(flag)},`)
    });
  }
  try {
    await command.run(message, args, flags);
  } catch (error) {
    console.log(error);
  }
  console.log('command ran');
};
