const { Telegraf } = require('telegraf')
const git = require('./git')
require('dotenv').config()

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.catch((err, { updateType }) => console.log(`Error for ${updateType}`, err))
bot.start(({ reply }) => reply('Welcome! Write /help to recieve instructions.'))
bot.help(({ reply }) => reply('Write me a message and I will push it to your git repo as markdown file'))

bot.on('text', async (ctx) => {
  await git(ctx.message.text)
  ctx.reply(`Sent: ${ctx.message.text}`)
})

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
