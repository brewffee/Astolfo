module.exports.run = async (client, message, args) => {
    const em = require('discord.js').MessageEmbed,
        config = require('../../config/config.json');
    // changelog = require('../../logs/entries.json');          soon(tm)
    if (!args[0] || args[0] == '12/5' || args[0] == 'v4-b068' || args[0] == 'v4-b069') {
        message.channel.send(
            new em()
                .setTitle('Changelog - December 5th, 2020')
                .addField('(v4-b083) Uptime command', '- Added `v4uptime`')
                .addField('(v4-b069) Say command fixes', '- Added error handling')
                .addField('(v4-b068) Internal changes + bug fixes', '- All commands use `new em()`\n- Avatar command fixed\n- Say should now work with mentions')
                .setFooter(`Astolfo ${config.version}`),
        );
    } else if (args[0] == '12/4' || args[0] == 'v4-b062' || args[0] == 'v4-b064') {
        message.channel.send(
            new em()
                .setTitle('Changelog - December 4th, 2020')
                .addField('(v4-b064) Commands imported from v3', '- Added `v3invite`, `v3say`')
                .addField('(v4-b062) Lots of internal changes', '- Code no longer uses `var` :sunglasses:\n- Command and event handlers tweaked\n- Error handling should be better')
                .setFooter(`Astolfo ${config.version}`),
        );
    } else if (args[0] == '12/3' || args[0] == 'v4-b048') {
        message.channel.send(
            new em()
                .setTitle('Changelog - December 3rd, 2020')
                .addField('(v4-b048) Internal changes', '- Cleaned up a bunch of code')
                .setFooter(`Astolfo ${config.version}`),
        );
    } else if (args[0] == '12/2' || args[0] == 'v4-b035' || args[0] == 'v4-b037' || args[0] == 'v4-b044') {
        message.channel.send(
            new em()
                .setTitle('Changelog - December 2nd, 2020')
                .addField('(v4-b045) Change GIF retrieval method', '- GIF commands now send files, not links')
                .addField('(v4-b037) GIF commands to v4', '- Upgraded gif commands to match v4style')
                .addField('(v4-b035) More GIFs', '- Implemented `v4gif` + `dog` and `v4cat`')
                .setFooter(`Astolfo ${config.version}`),
        );
    } else if (args[0] == '12/1' || args[0] == 'v4-b024' || args[0] == 'v4-b025' || args[0] == 'v4-b031') {
        message.channel.send(
            new em()
                .setTitle('Changelog - December 1st, 2020')
                .addField('(v4-b031) Avatar command', '- Implemented ~~v3avatar~~ `v4avatar` complete\n- Fixed a few bugs with using no args')
                .addField('(v4-b025) Patch', '- Fixed error with `upcoming` and `changelog` not sending')
                .addField('(v4-b024) v4 Ban/Kick commands + changelog', '- Ban and kick commands finally polished;\n- `changelog` and `upcoming` added to track bot changes')
                .setFooter(`Astolfo ${config.version}`),
        );
    } else {
        return message.channel.send(
            new em()
                .setColor('#f7b2d9')
                .setTitle('Uh oh!')
                .setDescription('Cannot find that date or version number.'),
        );
    }
};