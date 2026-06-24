const { cmd } = require('./arslan');
const { sleep } = require('./functions');

cmd({
  pattern: "ping",
  desc: "Check bot response speed",
  category: "main",
  react: "⚡",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    await conn.sendMessage(from, { react: { text: "⚡", key: m.key } });

    const msg = await conn.sendMessage(from, {
      text: "*🔄 𝗧𝗲𝘀𝘁𝗶𝗻𝗴 𝗦𝗽𝗲𝗲𝗱...*"
    }, { quoted: mek });

    await sleep(1000);

    for (let i = 0; i < 30; i++) {
      const start = Date.now();
      await sleep(50);
      const ping = Date.now() - start;

      await conn.relayMessage(from, {
        protocolMessage: {
          key: msg.key,
          type: 14,
          editedMessage: {
            conversation: `*⚡ 𝗦𝗣𝗘𝗘𝗗 ➠ ${ping}ms — 𝘼𝙃𝙈𝘼𝘿 𝙈𝙄𝙉𝙄 👑*`
          }
        }
      }, {});

      await sleep(1000);
    }

    await conn.sendMessage(from, { react: { text: "✅", key: m.key } });

  } catch (e) {
    console.error("Ping Error:", e);
    await conn.sendMessage(from, { react: { text: "❌", key: m.key } });
    reply("*❌ 𝗣𝗶𝗻𝗴 𝗳𝗮𝗶𝗹𝗲𝗱 — 𝗣𝗹𝗲𝗮𝘀𝗲 𝘁𝗿𝘆 𝗮𝗴𝗮𝗶𝗻.*");
  }
});
