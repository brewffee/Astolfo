const Command = require('../../util/Command');

module.exports = new Command({
  name: 'test',
  description: 'This is a test command.',
  usage: 'a!eval <code> [--return <any>]',
  args: [
    { name: 'arg1', optional: false, type: String },
    { name: 'arg2', optional: true, type: Number },
  ],
  cooldown: 2000,
  permissions: ['ADMINISTRATOR'],
  access: {
    guildOnly: false,
    guilds: null,
    roles: null,
    permissions: ['MANAGE_MESSAGES'],
    users: null,
  },
  run: async (message, args, flags) => {
    // Command Response
  },
});