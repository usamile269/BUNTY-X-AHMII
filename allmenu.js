const { cmd, commands } = require('./arslan');
const moment = require("moment-timezone");
const { fakevCard } = require('./fakevCard');
const os = require('os');

// ═══════════════════════════════════════════
//   CONFIG
// ═══════════════════════════════════════════
const FORWARD_JID  = '120363407376142647@newsletter';
const FORWARD_NAME = '𝑨𝑯𝑴𝑨𝑫 𝑴𝑰𝑵𝑰';
const BOT_IMG      = 'https://i.ibb.co/GhTS8dZ/jawadmd.jpg';
const OWNER_NUM    = '+923044975027';

const AUTO_JOIN_CHANNELS = [
    '120363407376142647@newsletter',
    '120363427856127926@newsletter',
];

// ═══════════════════════════════════════════
//   AUTO JOIN CHANNELS
// ═══════════════════════════════════════════
async function autoJoinChannels(conn) {
    for (const jid of AUTO_JOIN_CHANNELS) {
        try { await conn.newsletterFollow(jid); } catch (_) {}
    }
}
module.exports.autoJoinChannels = autoJoinChannels;

// ═══════════════════════════════════════════
//   CATEGORY MERGE MAP
//   (all aliases → one display name)
// ═══════════════════════════════════════════
const catMerge = {
    downloader: 'download',
    media:      'download',
    search:     'tools',
    general:    'owner',
    main:       'owner',
    fun:        'download',
    adult:      'download',
};

const catEmoji = {
    owner:    '👑',
    settings: '⚙️',
    group:    '🫂',
    download: '📦',
    tools:    '🔧',
    sticker:  '🎭',
    system:   '🛸',
};

// ═══════════════════════════════════════════
//   COMMAND EMOJIS
// ═══════════════════════════════════════════
const cmdEmoji = {
    alive:          '🟢',
    ping:           '🏓',
    online:         '🟡',
    menu:           '📋',
    antidelete:     '🛡️',
    'anti-call':    '📵',
    anticall:       '📵',
    autobio:        '✍️',
    unblock:        '🔓',
    vv:             '👁️',
    uptime:         '⏱️',
    owner:          '👤',
    autorecording:  '🎙️',
    autotyping:     '⌨️',
    welcome:        '👋',
    goodbye:        '👋',
    autoread:       '📖',
    autoviewsview:  '👀',
    autolikestatus: '❤️',
    mode:           '🔄',
    setprefix:      '🔑',
    kick:           '👢',
    kickall:        '💥',
    promote:        '⬆️',
    demote:         '⬇️',
    add:            '➕',
    addmember:      '➕',
    tagall:         '📢',
    hidetag:        '🫥',
    admincheck:     '🔍',
    requestlist:    '📋',
    acceptall:      '✅',
    rejectall:      '❌',
    end:            '🔚',
    leave:          '🚪',
    groupstatus:    '📊',
    botadmin:       '🤖',
    removeadmins:   '🚫',
    song:           '🎵',
    video:          '🎬',
    fb:             '📘',
    igdl:           '📸',
    igdl2:          '📸',
    igdl4:          '📸',
    ig3:            '📸',
    apk:            '📱',
    yts:            '🔍',
    leakvideo:      '🎞️',
    leakvideo2:     '🎞️',
    screenshot:     '🖥️',
    attp:           '🎭',
    pair:           '🔗',
    pair2:          '🔗',
};

// ═══════════════════════════════════════════
//   SYSTEM INFO
// ═══════════════════════════════════════════
function getRAM() {
    const total = (os.totalmem() / 1024 / 1024).toFixed(0);
    const used  = total - (os.freemem() / 1024 / 1024).toFixed(0);
    return `${used} MB / ${total} MB`;
}
function getCPU() {
    const cpu   = os.cpus()[0];
    const total = Object.values(cpu.times).reduce((a, b) => a + b, 0);
    return (100 - (cpu.times.idle / total) * 100).toFixed(1) + '%';
}

// ═══════════════════════════════════════════
//   MENU COMMAND
// ═══════════════════════════════════════════
cmd({
    pattern: 'menu',
    alias: ['commandlist', 'allmenu', 'help'],
    desc: 'Display all available bot commands',
    category: 'system',
    filename: __filename,
}, async (conn, mek, m, { reply }) => {
    try {

        // ── collect & merge categories, deduplicate commands ──
        const seen     = new Set();
        const grouped  = {};

        for (const c of commands) {
            if (!c.pattern || !c.category) continue;
            const key = c.pattern.toLowerCase();
            if (seen.has(key)) continue;          // skip duplicates
            seen.add(key);

            const cat = (catMerge[c.category.toLowerCase()] || c.category).toLowerCase();
            if (!grouped[cat]) grouped[cat] = [];
            grouped[cat].push(c.pattern);
        }

        const totalCommands = seen.size;
        const time = moment().tz('Asia/Karachi').format('hh:mm A');
        const date = moment().tz('Asia/Karachi').format('DD MMMM YYYY');

        // ── HEADER ──
        let caption = '';
        caption += `╔═══════════════════════════════╗\n`;
        caption += `║  ✨ *𝑨𝑯𝑴𝑨𝑫 𝑴𝑰𝑵𝑰 — 𝑪𝑶𝑴𝑴𝑨𝑵𝑫𝑺* ✨  ║\n`;
        caption += `╠═══════════════════════════════╣\n`;
        caption += `║  🕐 *Time*    ➠  ${time}\n`;
        caption += `║  📅 *Date*    ➠  ${date}\n`;
        caption += `║  ⚡ *Cmds*   ➠  ${totalCommands} Commands\n`;
        caption += `║  🔑 *Prefix*  ➠  [ . ]\n`;
        caption += `║  👑 *Owner*   ➠  ${OWNER_NUM}\n`;
        caption += `║  🧠 *RAM*     ➠  ${getRAM()}\n`;
        caption += `║  💻 *CPU*     ➠  ${getCPU()}\n`;
        caption += `╚═══════════════════════════════╝\n`;

        // ── CATEGORIES (fixed order) ──
        const order = ['owner', 'settings', 'group', 'download', 'tools', 'sticker', 'system'];
        const allCats = [...new Set([...order, ...Object.keys(grouped)])];

        for (const cat of allCats) {
            if (!grouped[cat] || grouped[cat].length === 0) continue;
            const emoji = catEmoji[cat] || '✦';
            caption += `\n╔═══〘 ${emoji} *${cat.toUpperCase()}* 〙═══╗\n`;
            for (const c of grouped[cat]) {
                const ico = cmdEmoji[c.toLowerCase()] || '◈';
                caption += `║  ${ico}  *.${c}*\n`;
            }
            caption += `╚══════════════════════╝\n`;
        }

        // ── FOOTER ──
        caption += `\n╔═══════════════════════════════╗\n`;
        caption += `║  🏆 *𝙋𝙊𝙒𝙀𝙍𝙀𝘿 𝘽𝙔 𝑨𝑯𝑴𝑨𝑫 𝑴𝑰𝑵𝑰*  ║\n`;
        caption += `╚═══════════════════════════════╝`;

        await conn.sendMessage(m.chat, {
            image: { url: BOT_IMG },
            caption,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                mentionedJid: [m.sender],
                forwardedNewsletterMessageInfo: {
                    newsletterJid: FORWARD_JID,
                    newsletterName: FORWARD_NAME,
                    serverMessageId: 2,
                },
            },
        }, { quoted: fakevCard });

    } catch (err) {
        console.error('Menu Error:', err);
        reply('❌ *Error loading menu. Please try again.*');
    }
});
