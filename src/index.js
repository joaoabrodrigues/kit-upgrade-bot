const env = require('../.env');
const Telegraf = require('telegraf')
const request = require('request')
const cheerio = require('cheerio')
const schedule = require('node-schedule')

const bot = new Telegraf(env.token)

const pageToVisit = 'https://www.terabyteshop.com.br/produto/12544/kit-upgrade286-placa-mae-processador-amd'

bot.start(async (ctx, next) => {
    const from = ctx.update.message.from
    if (from.id === env.myId) {
        await ctx.reply(`Hello ${from.first_name}, welcome! 😎`)
        next()
    } else {
        await ctx.reply('I don\'t know you, go fuck yourself!')
    }
})

bot.use(async ctx => {
    var rule = new schedule.RecurrenceRule()
    rule.minute = 0 // new schedule.Range(0, 59, 1)//

    schedule.scheduleJob(rule, async () => {
        console.log('Executing request')
        request(pageToVisit, async (error, response, body) => {
            console.log('Executed request')
            if (error) {
                console.log("Error: " + error);
            }
            
            if (response.statusCode === 200) {
                var $ = cheerio.load(body)
                const produto = $('.tit-prod').text()
                const valorPrazo = $('.valParc').text()
                const valorVista = $('.valVista').text()
                
                await ctx.replyWithMarkdown(`*${produto}*\n\nPreço à prazo: ${valorPrazo}\nPreço à vista: ${valorVista}\n[LINK](${pageToVisit}) \n\n`)
            }
        })
    })
})

bot.startPolling()