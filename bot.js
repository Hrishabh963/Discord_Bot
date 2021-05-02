const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json')
const command = require('./command')
const firstMessage = require('./first-message')
const privateMessage = require('./private-message')

client.on('ready', ()  => {
    console.log("Bot is ready")


    


    privateMessage(client, 'fuck' , 'Please refrain from using curse words.')


    command (client, 'ping', (message) => {
        message.channel.send('Pong')
    })


    command(client, 'serverInfo', (message) =>{
        const {guild} = message

        const { name, region, memberCount, owner, afkTimeout} = guild
        const icon = guild.iconURL()

        const embed = new Discord.MessageEmbed()
        .setTitle(`Server Info for "${name}"`)
        .setThumbnail(icon)
        .addFields(
            {
                name: "Owner",
                value: owner.user.tag
            },
            {
                name: "Members",
                value: memberCount
            },
            {
                name: "Region",
                value: region
            },
            {
                name: "AFK timeout",
                value: afkTimeout / 60
            },
        )
        message.channel.send(embed)
   
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


    command(client, 'createchannel', (message)=>{
        const name = message.content.replace('%createchannel', '')
        message.guild.channels.create(name,{
            type: 'text'
        })
        .then((channel)=>{
            const categoryId = '826136542174117930'
            channel.setParent(categoryId)

        })
    })


    command(client, 'createvoicechannel', (message)=>{
        const name = message.content.replace('%createvoicechannel', '')
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
        .setTitle('My Information')
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
            {
                name : 'Hosting website used',
                value : 'Heroku',
                inline:'true',
            },
        )

        message.channel.send(embed)
    })
    command(client, 'help', (message) =>{
        message.channel.send(`
        **%info**-Displays bot info
        **%serverInfo**-Displays server info
        **%createchannel 'channel name'**-Creates a text channel
        **%createvoicechannel 'channel name'**-Creates a voice channel
        **%clearchannel/%cc**-Clears all text messages in the channels
        **%status**-Displays the number of members in the server
        `)
    })


    const {prefix} = config

    client.user.setPresence({
        activity: {
            name: `Stop it get some${prefix}help`
        }
    })
})
client.login(config.token)