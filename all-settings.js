const { cmd } = require('./arslan');
const { updateUserConfig } = require('./database');

// Helper function to update config in memory and database
const updateConfig = async (key, value, botNumber, config, reply) => {
    try {
        // 1. Update in-memory config (Immediate)
        config[key] = value;
        
        // 2. Update in Database (Persistent)
        const newConfig = { ...config }; 
        newConfig[key] = value;
        
        await updateUserConfig(botNumber, newConfig);
        
        return reply(`✅ *${key}* has been updated to: *${value}*`);
    } catch (e) {
        console.error(e);
        return reply("❌ Error while saving to database.");
    }
};

// ============================================================
// 1. PRESENCE MANAGEMENT (Recording / Typing)
// ============================================================

cmd({
    pattern: "autorecording",
    alias: ["autorec", "arecording"],
    desc: "Enable/Disable auto recording simulation",
    category: "settings",
    react: "👑"
},
async(conn, mek, m, { args, isOwner, reply, botNumber, config }) => {
    if (!isOwner) return reply("*❌ 𝗧𝗵𝗶𝘀 𝗰𝗼𝗺𝗺𝗮𝗻𝗱 𝗶𝘀 𝗳𝗼𝗿 𝗼𝘄𝗻𝗲𝗿 𝗼𝗻𝗹𝘆.*");
    const value = args[0]?.toLowerCase();
    
    if (value === 'on' || value === 'true') {
        await updateConfig('AUTO_RECORDING', 'true', botNumber, config, reply);
    } else if (value === 'off' || value === 'false') {
        await updateConfig('AUTO_RECORDING', 'false', botNumber, config, reply);
    } else {
        reply(`*⚙️ 𝗔𝘂𝘁𝗼 𝗥𝗲𝗰𝗼𝗿𝗱𝗶𝗻𝗴 is currently: ${config.AUTO_RECORDING}\n\n𝗨𝘀𝗮𝗴𝗲: .autorecording on / off`);
    }
});

cmd({
    pattern: "autotyping",
    alias: ["autotype", "atyping"],
    desc: "Enable/Disable auto typing simulation",
    category: "settings",
    react: "👑"
},
async(conn, mek, m, { args, isOwner, reply, botNumber, config }) => {
    if (!isOwner) return reply("*❌ 𝗧𝗵𝗶𝘀 𝗰𝗼𝗺𝗺𝗮𝗻𝗱 𝗶𝘀 𝗳𝗼𝗿 𝗼𝘄𝗻𝗲𝗿 𝗼𝗻𝗹𝘆.*");
    const value = args[0]?.toLowerCase();
    
    if (value === 'on' || value === 'true') {
        await updateConfig('AUTO_TYPING', 'true', botNumber, config, reply);
    } else if (value === 'off' || value === 'false') {
        await updateConfig('AUTO_TYPING', 'false', botNumber, config, reply);
    } else {
        reply(`*⚙️ 𝗔𝘂𝘁𝗼 𝗧𝘆𝗽𝗶𝗻𝗴 is currently: ${config.AUTO_TYPING}\n\n𝗨𝘀𝗮𝗴𝗲: .autotyping on / off`);
    }
});

// ============================================================
// 2. CALL MANAGEMENT (Anti-Call)
// ============================================================

cmd({
    pattern: "anticall",
    alias: "acall",
    desc: "Auto reject calls",
    category: "settings",
    react: "👑"
},
async(conn, mek, m, { args, isOwner, reply, botNumber, config }) => {
    if (!isOwner) return reply("*❌ 𝗧𝗵𝗶𝘀 𝗰𝗼𝗺𝗺𝗮𝗻𝗱 𝗶𝘀 𝗳𝗼𝗿 𝗼𝘄𝗻𝗲𝗿 𝗼𝗻𝗹𝘆.*");
    const value = args[0]?.toLowerCase();
    
    if (value === 'on' || value === 'true') {
        await updateConfig('ANTI_CALL', 'true', botNumber, config, reply);
    } else if (value === 'off' || value === 'false') {
        await updateConfig('ANTI_CALL', 'false', botNumber, config, reply);
    } else {
        reply(`⚙️ *𝗔𝗻𝘁𝗶 𝗖𝗮𝗹𝗹* is currently: *${config.AUTO_RECORDING}*

𝗨𝘀𝗮𝗴𝗲: *.anticall on / off*`);
    }
});

// ============================================================
// 3. GROUP MANAGEMENT (Welcome / Goodbye)
// ============================================================

cmd({
    pattern: "welcome",
    desc: "Enable/Disable welcome messages",
    category: "settings",
    react: "👑"
},
async(conn, mek, m, { args, isOwner, reply, botNumber, config }) => {
    if (!isOwner) return reply("*❌ 𝗧𝗵𝗶𝘀 𝗰𝗼𝗺𝗺𝗮𝗻𝗱 𝗶𝘀 𝗳𝗼𝗿 𝗼𝘄𝗻𝗲𝗿 𝗼𝗻𝗹𝘆.*");
    const value = args[0]?.toLowerCase();
    
    if (value === 'on' || value === 'true') {
        await updateConfig('WELCOME', 'true', botNumber, config, reply);
    } else if (value === 'off' || value === 'false') {
        await updateConfig('WELCOME', 'false', botNumber, config, reply);
    } else {
        reply(`⚙️ *𝗪𝗲𝗹𝗰𝗼𝗺𝗲* is currently: *${config.WELCOME}*

𝗨𝘀𝗮𝗴𝗲: *.welcome on / off*`);
    }
});

cmd({
    pattern: "goodbye",
    desc: "Enable/Disable goodbye messages",
    category: "settings",
    react: "👑"
},
async(conn, mek, m, { args, isOwner, reply, botNumber, config }) => {
    if (!isOwner) return reply("*❌ 𝗧𝗵𝗶𝘀 𝗰𝗼𝗺𝗺𝗮𝗻𝗱 𝗶𝘀 𝗳𝗼𝗿 𝗼𝘄𝗻𝗲𝗿 𝗼𝗻𝗹𝘆.*");
    const value = args[0]?.toLowerCase();
    
    if (value === 'on' || value === 'true') {
        await updateConfig('GOODBYE', 'true', botNumber, config, reply);
    } else if (value === 'off' || value === 'false') {
        await updateConfig('GOODBYE', 'false', botNumber, config, reply);
    } else {
        reply(`⚙️ *𝗚𝗼𝗼𝗱𝗯𝘆𝗲* is currently: *${config.GOODBYE}*

𝗨𝘀𝗮𝗴𝗲: *.goodbye on / off*`);
    }
});

// ============================================================
// 4. READ & STATUS MANAGEMENT
// ============================================================

cmd({
    pattern: "autoread",
    desc: "Enable/Disable auto read messages (Blue Tick)",
    category: "settings",
    react: "👀"
},
async(conn, mek, m, { args, isOwner, reply, botNumber, config }) => {
    if (!isOwner) return reply("*❌ 𝗧𝗵𝗶𝘀 𝗰𝗼𝗺𝗺𝗮𝗻𝗱 𝗶𝘀 𝗳𝗼𝗿 𝗼𝘄𝗻𝗲𝗿 𝗼𝗻𝗹𝘆.*");
    const value = args[0]?.toLowerCase();
    
    if (value === 'on' || value === 'true') {
        await updateConfig('READ_MESSAGE', 'true', botNumber, config, reply);
    } else if (value === 'off' || value === 'false') {
        await updateConfig('READ_MESSAGE', 'false', botNumber, config, reply);
    } else {
        reply(`*⚙️ *𝗥𝗲𝗮𝗱 𝗠𝗲𝘀𝘀𝗮𝗴𝗲* is currently: *${config.READ_MESSAGE}*

𝗨𝘀𝗮𝗴𝗲: *.autoread on / off*`);
    }
});

cmd({
    pattern: "autoviewsview",
    alias: ["avs", "statusseen", "astatus"],
    desc: "Auto view status updates",
    category: "settings",
    react: "😎"
},
async(conn, mek, m, { args, isOwner, reply, botNumber, config }) => {
    if (!isOwner) return reply("*❌ 𝗧𝗵𝗶𝘀 𝗰𝗼𝗺𝗺𝗮𝗻𝗱 𝗶𝘀 𝗳𝗼𝗿 𝗼𝘄𝗻𝗲𝗿 𝗼𝗻𝗹𝘆.*");
    const value = args[0]?.toLowerCase();
    
    if (value === 'on' || value === 'true') {
        await updateConfig('AUTO_VIEW_STATUS', 'true', botNumber, config, reply);
    } else if (value === 'off' || value === 'false') {
        await updateConfig('AUTO_VIEW_STATUS', 'false', botNumber, config, reply);
    } else {
        reply(`⚙️ *𝗔𝘂𝘁𝗼 𝗩𝗶𝗲𝘄 𝗦𝘁𝗮𝘁𝘂𝘀* is currently: *${config.AUTO_VIEW_STATUS}*

𝗨𝘀𝗮𝗴𝗲: *.autoviewstatus on / off*`);
    }
});

cmd({
    pattern: "autolikestatus",
    alias: ["als"],
    desc: "Auto like status updates",
    category: "settings",
    react: "❤️"
},
async(conn, mek, m, { args, isOwner, reply, botNumber, config }) => {
    if (!isOwner) return reply("🚫 Owner only!");
    const value = args[0]?.toLowerCase();
    
    if (value === 'on' || value === 'true') {
        await updateConfig('AUTO_LIKE_STATUS', 'true', botNumber, config, reply);
    } else if (value === 'off' || value === 'false') {
        await updateConfig('AUTO_LIKE_STATUS', 'false', botNumber, config, reply);
    } else {
        reply(`Current Status: ${config.AUTO_LIKE_STATUS}\nUsage: .autolikestatus on/off`);
    }
});

// ============================================================
// 5. SYSTEM (Mode & Prefix)
// ============================================================

cmd({
    pattern: "mode",
    desc: "Change bot mode (public/private/groups/inbox)",
    category: "settings",
    react: "⚙️"
},
async(conn, mek, m, { args, isOwner, reply, botNumber, config }) => {
    if (!isOwner) return reply("*❌ 𝗧𝗵𝗶𝘀 𝗰𝗼𝗺𝗺𝗮𝗻𝗱 𝗶𝘀 𝗳𝗼𝗿 𝗼𝘄𝗻𝗲𝗿 𝗼𝗻𝗹𝘆.*");
    const mode = args[0]?.toLowerCase();
    const validModes = ['public', 'private', 'groups', 'inbox'];

    if (validModes.includes(mode)) {
        await updateConfig('WORK_TYPE', mode, botNumber, config, reply);
    } else {
        reply(`❌ *𝗜𝗻𝘃𝗮𝗹𝗶𝗱 𝗺𝗼𝗱𝗲.*

𝗔𝘃𝗮𝗶𝗹𝗮𝗯𝗹𝗲 𝗺𝗼𝗱𝗲𝘀: ${validModes.join(', ')}
𝗖𝘂𝗿𝗿𝗲𝗻𝘁: ${config.WORK_TYPE}`);
    }
});

cmd({
    pattern: "setprefix",
    desc: "Change bot prefix",
    category: "settings",
    react: "👑"
},
async(conn, mek, m, { args, isOwner, reply, botNumber, config }) => {
    if (!isOwner) return reply("*❌ 𝗧𝗵𝗶𝘀 𝗰𝗼𝗺𝗺𝗮𝗻𝗱 𝗶𝘀 𝗳𝗼𝗿 𝗼𝘄𝗻𝗲𝗿 𝗼𝗻𝗹𝘆.*");
    const newPrefix = args[0];

    if (newPrefix) {
        // Ensure prefix is short (single character or short string)
        if (newPrefix.length > 1 && newPrefix !== 'noprefix') return reply("❌ Prefix must be short (e.g. . or ! or #)");
        
        await updateConfig('PREFIX', newPrefix, botNumber, config, reply);
    } else {
        reply(`⚙️ *𝗖𝘂𝗿𝗿𝗲𝗻𝘁 𝗣𝗿𝗲𝗳𝗶𝘅:* ❮ ${config.PREFIX} ❯

𝗨𝘀𝗮𝗴𝗲: *.setprefix <symbol>*
𝗘𝘅𝗮𝗺𝗽𝗹𝗲: .setprefix !`);
    }
});
