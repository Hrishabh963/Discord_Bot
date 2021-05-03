module.exports = client =>{
    const channelIds = ['838004303444049950']

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