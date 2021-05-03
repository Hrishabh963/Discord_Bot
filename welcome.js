module.exports = client =>{
    const channelId = '838749022801494043'
    client.on('guildMemberAdd', (member)=>{
        const message = `Please welcome <@${member.id}>,hope you have fun!`

        const channel = member.guild.channels.cache.get(channelId)

        channel.send(message)
    })
}