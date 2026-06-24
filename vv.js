const { cmd } = require('./arslan')

cmd({
    pattern: "vv",
    alias: ["viewonce", "view", "open"],
    react: "🥺",
    desc: "Retrieve view-once media (Owner only)",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { from, isCreator, reply }) => {
    try {
        if (!isCreator)
            return reply("*❌ 𝗧𝗵𝗶𝘀 𝗰𝗼𝗺𝗺𝗮𝗻𝗱 𝗶𝘀 𝗳𝗼𝗿 𝗼𝘄𝗻𝗲𝗿 𝗼𝗻𝗹𝘆.*")

        if (!m.quoted)
            return reply(
                "*📸 𝗣𝗹𝗲𝗮𝘀𝗲 𝗿𝗲𝗽𝗹𝘆 𝘁𝗼 𝗮 𝘃𝗶𝗲𝘄 𝗼𝗻𝗰𝗲 𝗽𝗵𝗼𝘁𝗼 / 𝘃𝗶𝗱𝗲𝗼 / 𝗮𝘂𝗱𝗶𝗼*\n\n" +
                "*Phir likho:* `.vv`\n\n" +
                "*Phir dekho kamal 😎*"
            )

        // 🔥 VIEW ONCE FIX
        let quoted = m.quoted
        let msg = quoted.message

        if (msg?.viewOnceMessageV2) {
            msg = msg.viewOnceMessageV2.message
        } else if (msg?.viewOnceMessageV2Extension) {
            msg = msg.viewOnceMessageV2Extension.message
        }

        const type = Object.keys(msg)[0]
        const buffer = await quoted.download()

        let content = {}

        if (type === "imageMessage") {
            content = {
                image: buffer,
                caption: quoted.text || ""
            }
        } 
        else if (type === "videoMessage") {
            content = {
                video: buffer,
                caption: quoted.text || ""
            }
        } 
        else if (type === "audioMessage") {
            content = {
                audio: buffer,
                mimetype: "audio/mp4",
                ptt: false
            }
        } 
        else {
            return reply("*❌ ❌ 𝗧𝗵𝗶𝘀 𝗺𝗲𝗱𝗶𝗮 𝘁𝘆𝗽𝗲 𝗶𝘀 𝗻𝗼𝘁 𝘀𝘂𝗽𝗽𝗼𝗿𝘁𝗲𝗱.*")
        }

        await conn.sendMessage(from, content, { quoted: mek })

    } catch (e) {
        console.log("VV ERROR:", e)
        reply("*❌ VIEW ONCE OPEN KARNE ME ERROR AYA 🥺*")
    }
})
