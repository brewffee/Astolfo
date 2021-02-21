module.exports = {
    testInput(input) {
        return /^(<@)?!?\d+>?$|@?.+#\d{4}/.test(input);
    },
    async fetch(input, client) {
        let id;
        if (!input || !client) return null;
        /^(<@)?!?\d+>?$|@?.+#\d{4}/.test(input)
            ? id = input.replace(/\D/g, '')
            : null;
        return await client.users.fetch(id) || null;
    },
};
