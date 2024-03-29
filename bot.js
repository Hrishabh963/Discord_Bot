const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json')
const command = require('./command')
const privateMessage = require('./private-message')
const poll = require('./poll')

const mute = require('./mute')
const redis = require('./redis')

client.on('ready', ()  => {
    console.log("Bot is ready")

    mute(client)

    poll(client)


    privateMessage(client, 'fuck' , 'Please refrain from using curse words.')


    command (client, 'ping', (message) => {
        message.channel.send('Pong')
    })


    command(client, 'serverinfo', (message) =>{
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
            const categoryId = '843723447313891329'
            channel.setParent(categoryId)

        })
    })


    command(client, 'voicechannel', (message)=>{
        const name = message.content.replace('%createvoicechannel', '')
        message.guild.channels.create(name,{
            type: 'voice'
        })
        .then((channel)=>{
            const categoryId = '843723447313891332'
            channel.setParent(categoryId)
            channel.setUserLimit(9)

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
        const embed = new Discord.MessageEmbed()
        .setTitle("My supported commands")
        .setColor('black')
        .addFields(
            {
                name : '%info',
                value: 'Displays bot info',
                inline: 'true'
            },
            {
                name : '%serverinfo',
                value: 'Displays the current server info',
                inline: 'true'
            },
            {
                name : '%createchannel<channel name>',
                value: 'Creates text channel with <channel name>',
                inline: 'true'
            },
            {
                name : '%voicechannel<channel name>',
                value: 'Creates voice channel with <channel name>',
                inline: 'true'
            },
            {
                name : '%clearchannel/%cc',
                value: 'Bulk deletes messages',
                inline: 'true'
            },
            {
                name : '%status',
                value: 'Displays current no. of members in the server',
                inline: 'true'
            },
        )
        message.channel.send(embed)
    } )


    const {prefix} = config

    client.user.setPresence({
        activity: {
            name: `Stop it get some${prefix}help`
        }
    })


    command(client , 'ban', (message) => {
        const{member, mentions} = message

        if(member.hasPermission('BAN_MEMBERS')){
            const target = mentions.users.first()
            if(target){
                const targetMember = message.guild.members.cache.get(target.id)
                targetMember.ban()
                message.channel.send(`<@${member.id}> The specified user is banned`)
            } else{
                message.channel.send(`<@${member.id}> Please specify a user to ban`)
            }
        }else{
            message.channel.send(`<@${member.id}> You don't have permission to ban members`)
        }
    })


    
    command(client , 'kick', (message) => {
        const{member, mentions} = message

        if(member.hasPermission('KICK_MEMBERS')){
            const target = mentions.users.first()
            if(target){
                const targetMember = message.guild.members.cache.get(target.id)
                targetMember.kick()
                message.channel.send(`<@${member.id}> The specified user is kicked`)
            } else{
                message.channel.send(`<@${member.id}> Please specify a user to kick`)
            }
        }else{
            message.channel.send(`<@${member.id}> You don't have permission to kick members`)
        }
    })
    

    
})
client.login(config.token)