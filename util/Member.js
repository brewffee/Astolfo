module.exports = {
    testInput(input) {
        return /(^<@?!)?(\d)(>$)/.test(input) || /\d+$/.test(input);
    },
    async getMember(input, guild) {
        if (!input || !guild) return null;
        let id;

        /(^<@?!)?(\d)(>$)/.test(input)
            ? id = input.replace(/\D/g, '')
            : (
                /\d+$/.test(input)
                    ? id = input
                    : null
            );
        if (!id) return null;

        const member = await guild.members.fetch(id);
        return member ? member : null;
    },
};
