const fs = require('fs');
const dotenv = require('dotenv');

if (fs.existsSync('.env')) {
    dotenv.config({ path: '.env' });
}

module.exports = {
    // ===========================================================
    // 1. CONFIGURATION DE BASE (Session & Database)
    // ===========================================================
    SESSION_ID: process.env.SESSION_ID || "MINI BOT", 
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb+srv://offarslan_db_user:arslanmd@cluster0.xrqkzwg.mongodb.net/?appName=Cluster0',
    
    // ===========================================================
    // 2. INFORMATIONS DU BOT
    // ===========================================================
    PREFIX: process.env.PREFIX || '.',
    OWNER_NUMBER: process.env.OWNER_NUMBER || '+923044975027',
    OWNER_NAME: '𝗔𝗛𝗠𝗔𝗗 𝗠𝗜𝗡𝗜',
    BOT_NAME: "𝗔𝗛𝗠𝗔𝗗 𝗠𝗜𝗡𝗜",
    BOT_FOOTER: '© 𝗣𝗢𝗪𝗘𝗥𝗘𝗗 𝗕𝗬 𝗔𝗛𝗠𝗔𝗗 𝗠𝗜𝗡𝗜',
    
    // Mode de travail : public, private, group, inbox
    WORK_TYPE: process.env.WORK_TYPE || "public", 
    
    // ===========================================================
    // 3. FONCTIONNALITÉS AUTOMATIQUES (STATUTS)
    // ===========================================================
    AUTO_VIEW_STATUS: process.env.AUTO_VIEW_STATUS || 'true',
    AUTO_LIKE_STATUS: process.env.AUTO_LIKE_STATUS || 'true',
    AUTO_LIKE_EMOJI: ['❤️', '🌹', '✨', '🥰', '🌹', '😍', '💞', '💕', '☺️', '🤗'], 
    
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'false',
    AUTO_STATUS_MSG: process.env.AUTO_STATUS_MSG || '🤗',
    
    // ===========================================================
    // 4. FONCTIONNALITÉS DE CHAT & PRÉSENCE
    // ===========================================================
    READ_MESSAGE: process.env.READ_MESSAGE || 'false',
    AUTO_TYPING: process.env.AUTO_TYPING || 'false',
    AUTO_RECORDING: process.env.AUTO_RECORDING || 'false',
    
    // ===========================================================
    // 5. GESTION DES GROUPES
    // ===========================================================
    WELCOME_ENABLE: process.env.WELCOME_ENABLE || 'true',
    GOODBYE_ENABLE: process.env.GOODBYE_ENABLE || 'true',
    WELCOME_MSG: process.env.WELCOME_MSG || null, 
    GOODBYE_MSG: process.env.GOODBYE_MSG || null, 
    WELCOME_IMAGE: process.env.WELCOME_IMAGE || null, 
    GOODBYE_IMAGE: process.env.GOODBYE_IMAGE || null,
    
    GROUP_INVITE_LINK: process.env.GROUP_INVITE_LINK || 'https://chat.whatsapp.com/Gv5PhluFs779AyMcTdjRjb?s=cl&p=a&mlu=4',
    
    // ===========================================================
    // 6. SÉCURITÉ & ANTI-CALL
    // ===========================================================
    ANTI_CALL: process.env.ANTI_CALL || 'false',
    REJECT_MSG: process.env.REJECT_MSG || '*📵 𝗖𝗔𝗟𝗟 𝗟𝗔𝗧𝗘𝗥 𝗣𝗟𝗘𝗔𝗦𝗘 ☺️🌹*',
    
    // ===========================================================
    // 7. IMAGES & LIENS
    // ===========================================================
    IMAGE_PATH: 'https://i.ibb.co/GhTS8dZ/jawadmd.jpg',
    CHANNEL_LINK: 'https://chat.whatsapp.com/Gv5PhluFs779AyMcTdjRjb?s=cl&p=a&mlu=4',
    
    // ===========================================================
    // 8. EXTERNAL API (Optionnel)
    // ===========================================================
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN || '',
    TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID || '+923044975027'
    
};
