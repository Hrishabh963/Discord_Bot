const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json')
const command = require('./command')
const firstMessage = require('./first-message')

client.on('ready', ()  => {
    console.log("Bot is ready")

    firstMessage(client, '837996665222201344', 'Hello World', ['🔥', '😎'])

    command (client, 'ping', (message) => {
        message.channel.send('Pong')
    })
    command(client, 'server', (message) =>{
        client.guilds.cache.forEach((guild) => {
            message.channel.send(`${guild.name} has a total of ${guild.memberCount} members.`)
        })
    })
    command(client, ['clearchannel', 'cc'], (message) =>{
        if(message.member.hasPermission('ADMINISTRATOR')){
            message.channel.messages.fetch().then((results)=>{
                message.channel.bulkDelete(results)
            })
        }
    })
    command(client, 'status' , message =>{
        const content = message.content.replace('%status', '')
        client.user.setPresence({
            activity: {
                name: content,
                type: 0,
            }
        })
    })
})
client.login(config.token)