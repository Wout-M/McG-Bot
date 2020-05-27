const { MessageAttachment } = require("discord.js");

module.exports = {
    name: "pfp",
    category: "Utility",
    description: "Display someones profile picture",
    aliases: ["icon", "avatar"],
    usage: "[user]",
    args: true,
    run(message, args) {
        if(message.mentions.users.size < 1 && !args[0]) return message.channel.send(new MessageAttachment(message.author.avatarURL()));

        if(message.mentions.users.first()) return message.channel.send(new MessageAttachment(message.mentions.users.first().avatarURL()))
    }
}