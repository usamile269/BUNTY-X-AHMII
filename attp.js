const { cmd } = require('./arslan')
const { fetchGif, gifToSticker } = require('./sticker-utils')

cmd({
    pattern: "attp",
    alias: ["attptext", "textsticker", "namesticker", "stickername", "at", "att", "atp"],
    react: "✨",
    desc: "Convert text into animated sticker",
    category: "sticker",
    use: ".attp <text>",
    filename: __filename
},
async (conn, mek, m, { args, reply }) => {
    try {
        if (!args[0]) {
            return reply(
                "*🥺 APKO APKE NAME KA STICKER BANANA HAI*\n\n" +
                "*Use:* `.attp APKA NAME`\n\n" +
                "*Example:*\n.attp Bilal"
            )
        }

        reply("*✨ 𝗖𝗿𝗲𝗮𝘁𝗶𝗻𝗴 𝘆𝗼𝘂𝗿 𝘀𝘁𝗶𝗰𝗸𝗲𝗿...*\n*𝗣𝗹𝗲𝗮𝘀𝗲 𝘄𝗮𝗶𝘁 𝗮 𝗺𝗼𝗺𝗲𝗻𝘁... ⏳*")

        const text = encodeURIComponent(args.join(" "))
        const gifBuffer = await fetchGif(
            `https://api-fix.onrender.com/api/maker/attp?text=${text}`
        )

        const sticker = await gifToSticker(gifBuffer)

        await conn.sendMessage(
            m.chat,
            { sticker },
            { quoted: mek }
        )

    } catch (e) {
        console.log("ATTP ERROR:", e)
        reply("❌ Error creating sticker. Please try again.")
    }
})
