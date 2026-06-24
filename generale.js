const { cmd, commands } = require('./arslan');
const config = require('./config');
const os = require('os');

cmd({
    pattern: "Uptime",
    alias: ["speed"],
    desc: "Check latency and system resources",
    category: "general",
    react: "⚡"
},
async(conn, mek, m, { from, reply, myquoted }) => {
    try {
        const start = Date.now();
        const msg = await conn.sendMessage(from, { text: '*⚡ 𝗧𝗘𝗦𝗧𝗜𝗡𝗚...*' }, { quoted: myquoted });
        const end = Date.now();
        const latency = end - start;

        const totalMem = (os.totalmem() / 1024 / 1024).toFixed(0);
        const freeMem  = (os.freemem()  / 1024 / 1024).toFixed(0);
        const usedMem  = (totalMem - freeMem).toFixed(0);

        const pingMsg = `
*⚡ 𝘼𝙃𝙈𝘼𝘿 𝙈𝙄𝙉𝙄 — 𝙎𝙔𝙎𝙏𝙀𝙈 𝙎𝙏𝘼𝙏𝙐𝙎 👑*

*╔══════════════════⊷*
*║  ⚡  𝗦𝗣𝗘𝗘𝗗   ➠  ${latency}ms*
*║  🧠  𝗥𝗔𝗠     ➠  ${usedMem}MB / ${totalMem}MB*
*║  🟢  𝗦𝗧𝗔𝗧𝗨𝗦  ➠  Online*
*╚══════════════════⊷*

*🏆 𝙋𝙊𝙒𝙀𝙍𝙀𝘿 𝘽𝙔 𝘼𝙃𝙈𝘼𝘿 𝙈𝙄𝙉𝙄*`;

        await conn.sendMessage(from, { text: pingMsg, edit: msg.key });

    } catch (e) {
        reply("❌ *𝗘𝗿𝗿𝗼𝗿:* " + e.message);
    }
});

cmd({
    pattern: "owner",
    desc: "Contact the bot owner",
    category: "general",
    react: "👑"
},
async(conn, mek, m, { from, myquoted }) => {
    const ownerNumber = config.OWNER_NUMBER;

    const vcard = 'BEGIN:VCARD\n' +
                  'VERSION:3.0\n' +
                  'FN:Ahmad Mini (Owner)\n' +
                  'ORG:Ahmad Mini Corp;\n' +
                  `TEL;type=CELL;type=VOICE;waid=${ownerNumber}:${ownerNumber}\n` +
                  'END:VCARD';

    await conn.sendMessage(from, {
        contacts: {
            displayName: '𝑨𝑯𝑴𝑨𝑫 𝑴𝑰𝑵𝑰',
            contacts: [{ vcard }]
        }
    }, { quoted: myquoted });
});
