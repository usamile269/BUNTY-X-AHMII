const { cmd } = require('./arslan');
const axios = require('axios');
const { fakevCard } = require('./fakevCard');

const XV_API = "https://arslan-apis-v2.vercel.app";

const AXIOS_DEFAULTS = {
    timeout: 30000,
    headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json'
    }
};

// 🔁 Retry helper
async function tryRequest(fn, tries = 3) {
    let err;
    for (let i = 1; i <= tries; i++) {
        try {
            return await fn();
        } catch (e) {
            err = e;
            await new Promise(r => setTimeout(r, i * 1000));
        }
    }
    throw err;
}

// ❤️ React helper
async function react(sock, mek, emoji) {
    await sock.sendMessage(mek.key.remoteJid, {
        react: { text: emoji, key: mek.key }
    });
}

// 📦 Stylish info box
function xBox(data) {
    return `
‎*╔ஜ۩▒█ *𝗔𝗛𝗠𝗔𝗗 𝗠𝗜𝗡𝗜* █▒۩ஜ╗*
*|* *_𝗔𝗛𝗠𝗔𝗗 𝗠𝗜𝗡𝗜 𝗫𝗩𝗜𝗗𝗘𝗢𝗦_* 
*|┉┉┉┉◉◉◉┉┉┉┉┉┉┉━•⟢*
*|▸ 📌 ᴛɪᴛʟᴇ:* ${data.title}
*|▸ ⏱ ᴅᴜʀᴀᴛɪᴏɴ:* ${data.duration || "N/A"}
*|▸ 👁️ ᴠɪᴇᴡs:* ${data.views || "N/A"}
*|▸ 🥵 ᴏɴʟʏ:* 🔞.... 
*╰━━━━━━━━━━━━━━━━━━⊷*`;
}

// 🔍 Search API
async function searchXvideos(query) {
    const api = `${XV_API}/download/xvideosSearch?text=${encodeURIComponent(query)}`;
    const res = await tryRequest(() => axios.get(api, AXIOS_DEFAULTS));
    if (res.data?.status && res.data.result?.length)
        return res.data.result;
    throw new Error("Search failed");
}

// 🎬 Download API
async function downloadXvideo(url) {
    const api = `${XV_API}/download/xvideosDown?url=${encodeURIComponent(url)}`;
    const res = await tryRequest(() => axios.get(api, AXIOS_DEFAULTS));
    if (res.data?.status && res.data.result?.url)
        return res.data.result;
    throw new Error("Download failed");
}

// ===============================
// 🔞 COMMAND: .xvideo <query|link>
// ===============================
cmd({
    pattern: "xxxvideo",
    alias: ["xxx", "porn", "sex", "sexyvideos", "pornhub", "xvideos", "sexy"],
    desc: "Search or download Xvideos",
    category: "adult",
    react: "🔞",
    filename: __filename
}, async (sock, mek, m, { reply }) => {

    try {
        const text = m.message?.conversation || m.message?.extendedTextMessage?.text || "";
        const query = text.split(" ").slice(1).join(" ").trim();

        if (!query)
            return reply("⚠️ *Usage:*\n.xvideo <name or link>");

        await react(sock, mek, "🔍");

        let videoData;
        let videoUrl;

        // 🔗 Direct link
        if (query.startsWith("http")) {
            videoUrl = query;
            videoData = { title: "Xvideos Video", duration: "Unknown" };
        } 
        // 🔎 Search
        else {
            const results = await searchXvideos(query);
            videoData = results[0];
            videoUrl = videoData.url;
        }

        // 📦 Info box
        await sock.sendMessage(m.chat, {
            image: { url: videoData.thumb || "https://i.ibb.co/GhTS8dZ/jawadmd.jpg" },
            caption: xBox(videoData)
        }, { quoted: fakevCard });

        await react(sock, mek, "⏳");

        // 🎬 Download
        const file = await downloadXvideo(videoUrl);

        await sock.sendMessage(m.chat, {
            video: { url: file.url },
            mimetype: "video/mp4",
            fileName: `${videoData.title}.mp4`,
            caption: `
‎*╔ஜ۩▒█ *𝗔𝗛𝗠𝗔𝗗 𝗠𝗜𝗡𝗜* █▒۩ஜ╗*
‎*| 𝗣𝗢𝗪𝗘𝗥𝗘𝗗 𝗕𝗬 𝗔𝗛𝗠𝗔𝗗 𝗠𝗜𝗡𝗜 
‎*╰━━━━━━━━━━━━━━━━━━⊷*`
        }, { quoted: fakevCard });

        await react(sock, mek, "✅");

    } catch (e) {
        console.error(e);
        await react(sock, mek, "❌");
        reply("❌ Download failed!");
    }
});
