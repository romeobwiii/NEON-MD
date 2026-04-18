const { cmd } = require("../command");

cmd({
  pattern: "clearchat",
  alias: ["deletechat"],
  react: '🗑️',
  desc: "Clear/delete the current chat",
  category: "owner",
  use: ".clearchat",
  filename: __filename
}, async (conn, mek, m, { from, reply, isGroup, isOwner, isAdmins }) => {
  try {

    // Group: must be admin or owner
    if (isGroup && !isOwner && !isAdmins) {
      return reply("❌ Only group admins or bot owner can clear this chat.");
    }

    // DM: must be owner or bot itself
    if (!isGroup && !isOwner && !mek.key.fromMe) {
      return reply("❌ Only the bot owner can clear DM chats.");
    }

    await conn.chatModify({
      delete: true,
      lastMessages: [{
        key: mek.key,
        messageTimestamp: mek.messageTimestamp
      }]
    }, from);

    await reply("🗑️ *Chat cleared successfully!*");

  } catch (e) {
    console.error('[CLEARCHAT] Error:', e.message);
    await reply(`❌ Failed to clear chat: ${e.message}`);
  }
});
