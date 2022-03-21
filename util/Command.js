module.exports = class Command {
  constructor(options) {
    this.name = options.name;
    this.description = options.description;
    this.usage = options.usage;
    this.cooldown = options?.cooldown || null;
    this.permissions = options?.permissions,
    this.access = {
      guildOnly: Boolean(options?.access?.guildOnly),
      guilds: options?.access?.guilds || null,
      roles: options?.access?.roles || null,
      permissions: options.access?.permissions,
      users: options?.access?.users || null,
    };
    this.run = options.run;
  }
}