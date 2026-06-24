const { cmd } = require('./arslan');
const axios = require('axios');

cmd({
  pattern: "apk",
  alias: ["app", "playstore", "application"],
  react: "📦",
  desc: "Download APK via Aptoide",
  category: "download",
  use: ".apk <name>",
  filename: __filename
}, async (conn, mek, m, { from, reply, q }) => {
  try {
    if (!q) return reply(
      `*📦 𝗔𝗣𝗞 𝗗𝗼𝘄𝗻𝗹𝗼𝗮𝗱𝗲𝗿*\n\n` +
      `*𝗨𝘀𝗮𝗴𝗲:*  .apk <app name>\n` +
      `*𝗘𝘅𝗮𝗺𝗽𝗹𝗲:*  .apk WhatsApp`
    );

    const apiUrl = `http://ws75.aptoide.com/api/7/apps/search/query=${encodeURIComponent(q)}/limit=1`;
    const { data } = await axios.get(apiUrl);

    if (!data || !data.datalist || !data.datalist.list.length) {
      return reply("*❌ 𝗔𝗣𝗞 𝗻𝗼𝘁 𝗳𝗼𝘂𝗻𝗱. 𝗧𝗿𝘆 𝗮 𝗱𝗶𝗳𝗳𝗲𝗿𝗲𝗻𝘁 𝗻𝗮𝗺𝗲.*");
    }

    const app = data.datalist.list[0];
    const appSize = (app.size / 1048576).toFixed(2);

    let caption = `
╔══〘 *𝑨𝑷𝑲 𝑰𝑵𝑭𝑶* 〙══╗
║
║  📱  𝗡𝗮𝗺𝗲     ➠  ${app.name.toUpperCase()}
║  📦  𝗦𝗶𝘇𝗲     ➠  ${appSize} MB
║  🔖  𝗣𝗮𝗰𝗸𝗮𝗴𝗲  ➠  ${app.package}
║  🔢  𝗩𝗲𝗿𝘀𝗶𝗼𝗻  ➠  ${app.file.vername}
║
╚════════════════╝

*🏆 𝘼𝙃𝙈𝘼𝘿 𝙈𝙄𝙉𝙄 👑*`.trim();

    await conn.sendMessage(from, { image: { url: app.icon }, caption }, { quoted: mek });
    await conn.sendMessage(from, {
      document: { url: app.file.path || app.file.path_alt },
      mimetype: "application/vnd.android.package-archive",
      fileName: `${app.name}.apk`
    }, { quoted: mek });

    await m.react("✅");
  } catch (err) {
    reply("*❌ 𝗗𝗼𝘄𝗻𝗹𝗼𝗮𝗱 𝗳𝗮𝗶𝗹𝗲𝗱. 𝗣𝗹𝗲𝗮𝘀𝗲 𝘁𝗿𝘆 𝗮𝗴𝗮𝗶𝗻.*");
  }
});
