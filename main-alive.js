const { cmd, commands } = require('./arslan');
const config = require('./config');

cmd({
    pattern: "alive",
    alias: ["status", "live"],
    desc: "Check uptime and system status",
    category: "main",
    react: "👑",
    filename: __filename
},
async (conn, mek, m, { from, sender, reply }) => {
    try {
        const totalCmds = commands.length;
        const uptime = () => {
            let sec = process.uptime();
            let h = Math.floor(sec / 3600);
            let m = Math.floor((sec % 3600) / 60);
            let s = Math.floor(sec % 60);
            return `${h}h ${m}m ${s}s`;
        };

        const status = `
*🤖 𝘼𝙃𝙈𝘼𝘿 𝙈𝙄𝙉𝙄 𝙄𝙎 𝘼𝙇𝙄𝙑𝙀 👑*
*╔════〘 𝗜𝗡𝗙𝗢 〙════⊷*
*║  🌐  𝗠𝗢𝗗𝗘    ➠  ${config.WORK_TYPE || 'public'}*
*║  👤  𝗢𝗪𝗡𝗘𝗥   ➠  ${config.OWNER_NAME || '𝗔𝗛𝗠𝗔𝗗 𝗠𝗜𝗡𝗜'}*
*║  🔑  𝗣𝗥𝗘𝗙𝗜𝗫  ➠  ❮ ${config.PREFIX || '.'} ❯*
*║  📦  𝗩𝗘𝗥     ➠  1.0.0*
*║  ⚡  𝗖𝗠𝗗𝗦   ➠  ❮ ${totalCmds} ❯*
*║  ⏳  𝗨𝗣𝗧𝗜𝗠𝗘 ➠  ${uptime()}*
*╚════════════════⊷*
*🏆 𝘼𝙃𝙈𝘼𝘿 𝙈𝙄𝙉𝙄 𝙒𝙃𝘼𝙏𝙎𝘼𝙋𝙋 𝘽𝙊𝙏 👑*`;

        await conn.sendMessage(from, {
            text: status,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363407376142647@newsletter',
                    newsletterName: '𝑨𝑯𝑴𝑨𝑫 𝑴𝑰𝑵𝑰',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Alive Error:", e);
        reply(`❌ *𝗘𝗿𝗿𝗼𝗿:* ${e.message}`);
    }
});
