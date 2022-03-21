module.exports = {
    testInput(input) {
        return /^(<@)?!?\d{17,}>?$|@?.+#\d{4}/.test(input);
    },
    async fetch(input, client) {
        if (!input || !client) return null;
        if (!/^(<@)?!?\d{17,}>?$|@?.+#\d{4}/.test(input)) return null;
        const id = input.replace(/\D/g, '');
        return await client.users.fetch(id) || null;
    },
    async guildFetch(input, guild) {
        if (!input || !guild) return null;
        if (!/^(<@)?!?\d{17,}>?$|@?.+#\d{4}/.test(input)) return null;
        const id = input.replace(/\D/g, '');
        return await guild.members.fetch(id) || null;
    },
};
