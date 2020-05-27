const { MessageAttachment } = require("discord.js");

module.exports = {
    name: "detention",
    category: "Fun",
    description: "Send someone to detention",
    usage: "<user>",
    args: true,
    run(message, args){
        if(message.mentions.users.size < 1) return message.reply('You must mention someone to send them to detention');

        const user = message.mentions.users.first();
        if(user === message.author) return message.channel.send(`Do you want to send yourself to detention, ${user}?`)
        const gif = new MessageAttachment("https://media.giphy.com/media/Vq2FdyzwkKHEk/giphy.gif");
        message.channel.send(`${user}, you have been sent to detention by ${message.author.username.toString()}`,  gif)
    }
}