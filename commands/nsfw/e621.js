const e621 = require('e621');
const Discord = require('discord.js');
const Errors = require('../../util/Errors.js');
const Command = require('../../util/Command');
const e621Client = new e621({ blacklist: ['young -rating:s', 'shota', 'loli'] });

module.exports = new Command({
  name: 'e621',
  description: 'Searches e621 for an image.',
  usage: 'a!e621 <tags|id>',
  args: [
    { name: 'tags', optional: false, type: 'string' },
    { name: 'id', optional: false, type: 'string' },
  ],
  run: async (message, args, flags) => {
    if (!args[0]) return message.channel.send('provide arguments dummy');
    let posts, post;
    if (/\d/.test(args[0]) && !args[1] && args[0].length < 10) {
      const query = args[0];
      post = (await e621Client.getPosts([`id:${query}`], 1))[0];
      if (post && message.guild && !message.channel.nsfw && post.rating !== 's') return message.channel.send('horny fucker go to nsfw channel');
    } else {
      const query = message.channel.nsfw || !message.guild
        ? args
        : args.concat('rating:s');
      posts = await e621Client.getPosts(query, 320);
      post = posts[Math.floor(Math.random() * posts.length)];
    }
    if (!post) return message.channel.send('Error: no post');
    const colors = { s: 'GREEN', q: 'ORANGE', e: 'RED' };
    const { general, species, character, copyright, artist, invalid, lore, meta } = post.tags;
    const tags = [].concat(invalid, artist, copyright, character, species, general, lore, meta).join(' ').slice(0, 250);
    const formats = {
      png: 'img',
      jpg: 'img',
      webp: 'img',
      gif: 'img',
      webm: 'video',
      swf: 'flash',
    };
    const embeds = {
      img: {
        color: colors[post.rating],
        title: `Result for ${args.join(' ')}`,
        url: `https://e621.net/posts/${post.id}`,
        description: `Image not loading? Click [here](${post.file.url}).`,
        image: {
          url: post.file.url,
        },
        footer: {
          text: `❤️ ${post.fav_count} | Score: ${post.score.total} | Artist: ${post.tags.artist[0] || 'Unknown'} | Post #${post.id}`
        },
      },
      video: {
        color: colors[post.rating],
        title: `[Video] Result for ${args.join(' ')}`,
        url: `https://e621.net/posts/${post.id}`,
        description: `[#${post.id} - ${tags.slice(0, tags.lastIndexOf(' ')).replace(/_/g, '\\_')}](${post.file.url})`,
        thumbnail: {
          url: post.preview.url,
        },
        footer: {
          text: `❤️ ${post.fav_count} | Score: ${post.score.total} | Artist: ${post.tags.artist[0] || 'Unknown'} | Post #${post.id}`
        },
      },
      flash: {
        color: colors[post.rating],
        title: `[Flash] Result for ${args.join(' ')}`,
        url: `https://e621.net/posts/${post.id}`,
        description: 
        `**Adobe Flash has reached end of life, and no longer works in browsers. Please see [this thread](https://e621.net/forum_topics/22535) on the forum for details on how you can continue to play this file. **
        \n[#${post.id} - ${tags.slice(0, tags.lastIndexOf(' ')).replace(/_/g, '\\_')}](${post.file.url})`,
        //thumbnail: {
        //  url: post.preview.url,
        //},
        footer: {
          text: `❤️ ${post.fav_count} | Score: ${post.score.total} | Artist: ${post.tags.artist[0] || 'Unknown'} | Post #${post.id}`
        },
      },

    };

    return message.channel.send(new Discord.MessageEmbed(embeds[formats[post.file.ext]]));
  },
});
