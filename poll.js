module.exports = client =>{
    const channelIds = ['844210693824577568']

    const addReactions = message =>{
        message.react('👍')

        setTimeout(()=>{
            message.react('👎')
        },750)
    }
    client.on('message',message =>{
        if(channelIds.includes(message.channel.id)){
            addReactions(message)
        }
    })

}