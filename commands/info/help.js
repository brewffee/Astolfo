module.exports.run = async (m) =>
  await m.channel.send(
    Array.from(m.client.commands)
      .toString()
      .replace(/\[object Object],|,\[object Object]$/g, ' '),
  );