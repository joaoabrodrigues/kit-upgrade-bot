const env = require('../.env');
const Telegraf = require('telegraf')

const bot = new Telegraf(env.token)

bot.start(async ctx => {
    const from = ctx.update.message.from
    await ctx.reply(`Hello ${from.first_name}, welcome! 😎`)
})

bot.startPolling()