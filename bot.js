const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json')
const command = require('./command')

client.on('ready', ()  => {
    console.log("Bot is ready")

    command (client, 'ping', (message) => {
        message.channel.send('Pong')
    })
    command(client, 'server', (message) =>{
        client.guilds.cache.forEach((guild) => {
            message.channel.send(`${guild.name} has a total of ${guild.memberCount} members.`)
        })
    })
})
client.login(config.token)