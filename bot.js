const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json')
const command = require('./command')
const firstMessage = require('./first-message')
const privateMessage = require('./private-message')

client.on('ready', ()  => {
    console.log("Bot is ready")


    firstMessage(client, '837996665222201344', 'Hello World', ['🔥', '😎'])


    privateMessage(client, 'fuck' , 'Please refrain from using curse words.')


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


    command(client, 'createChannel', (message)=>{
        const name = message.content.replace('%createChannel', '')
        message.guild.channels.create(name,{
            type: 'text'
        })
        .then((channel)=>{
            const categoryId = '826136542174117930'
            channel.setParent(categoryId)

        })
    })


    command(client, 'createVoiceChannel', (message)=>{
        const name = message.content.replace('%createVoiceChannel', '')
        message.guild.channels.create(name,{
            type: 'voice'
        })
        .then((channel)=>{
            const categoryId = '826136542174117933'
            channel.setParent(categoryId)
            channel.setUserLimit(6)

        })
    })
    command(client, 'info', (message) =>{
        const embed = new Discord.MessageEmbed()
        .setTitle('Example Text')
        .setAuthor(message.author.username)
        .setColor('black')
        .addFields(
            {
                name : 'Bot Name',
                value : 'Botto',
                inline:'true',
            },
            {
                name : 'Owner Name',
                value : 'Hrishabh',
                inline:'true',
            },
        )

        message.channel.send(embed)
    })
})
client.login(config.token)