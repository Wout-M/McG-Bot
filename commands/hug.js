const { MessageAttachment } = require("discord.js");

module.exports = {
    name: "hug",
    category: "Fun",
    description: "Give someone a hug",
    usage: "<user>",
    args: true,
    run(message, args) {
        if(message.mentions.users.size < 1) return message.reply('You must mention someone to hug them');

        const user = message.mentions.users.first();
        const gif = new MessageAttachment("https://pa1.narvii.com/5853/d193923062ead6ddf60b5305cb949b0817e97ffc_hq.gif");
        let text = `${user}, ${message.author.username.toString()} gave you a hug`
        if(user === message.author) text = `${user} gave themselves a hug`
        message.channel.send(text,  gif)
    }
}