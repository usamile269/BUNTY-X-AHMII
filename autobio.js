const { cmd } = require('./arslan');
const config = require('./config');

cmd({
  pattern: "autobio",
  alias: ["bioauto", "setautobio"],
  react: "😎",
  category: "owner",
  desc: "Auto bio on/off",
  filename: __filename
}, async (conn, mek, m, { from, q, reply, isOwner }) => {
  try {

    // 🔐 Owner only
    if (!isOwner) {
      return reply("*❌ 𝗧𝗵𝗶𝘀 𝗰𝗼𝗺𝗺𝗮𝗻𝗱 𝗶𝘀 𝗳𝗼𝗿 𝗼𝘄𝗻𝗲𝗿 𝗼𝗻𝗹𝘆.*");
    }

    const state = q?.toLowerCase();

    // ❓ Help / status
    if (!state || !["on", "off"].includes(state)) {
      return reply(
        `*AUTO BIO COMMAND 🥰*\n
➤ *.autobio on*
➤ *.autobio off*

📌 *𝗔𝘂𝘁𝗼𝗯𝗶𝗼 𝗦𝘁𝗮𝘁𝘂𝘀:* ${global.autoBio ? "ON ✅" : "OFF ❌"}`
      );
    }

    // ✅ Set state
    global.autoBio = state === "on";

    if (global.autoBio) {
      updateBio(conn);
    }

    return reply(`*✅ Auto Bio has been turned ${state.toUpperCase()} successfully.*`);

  } catch (e) {
    console.log("AUTOBIO ERROR:", e);
    reply("*❌ An error occurred. Please try again.");
  }
});


// ================= BIO UPDATER =================
async function updateBio(conn) {
  if (!global.autoBio) return;

  try {
    const uptime = clockString(process.uptime() * 1000);
    const botname = config.BOT_NAME || "𝗔𝗛𝗠𝗔𝗗 𝗠𝗜𝗡𝗜";

    const bio = `👑 ${botname} ACTIVE (${uptime}) 👑`;
    await conn.updateProfileStatus(bio);

    console.log("✅ BIO UPDATED:", bio);
  } catch (err) {
    console.log("❌ BIO UPDATE FAILED:", err.message);
  }

  // ⏱️ 1 minute loop
  setTimeout(() => updateBio(conn), 60 * 1000);
}


// ================= TIME FORMAT =================
function clockString(ms) {
  const d = Math.floor(ms / 86400000);
  const h = Math.floor(ms / 3600000) % 24;
  const m = Math.floor(ms / 60000) % 60;
  const s = Math.floor(ms / 1000) % 60;

  let str = "";
  if (d) str += `${d}D `;
  if (h) str += `${h}H `;
  if (m) str += `${m}M `;
  if (s) str += `${s}S`;
  return str.trim();
}
