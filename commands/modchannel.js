const config = require("../config.json");
const fs = require("fs");

module.exports = {
    name: "modchannel",
    category: "Admin",
    description: "Configure the admin channel",
    aliases: ["mc", "adminchannel"],
    usage: "[channel]",
    admin: true,
    run(message, args) {
        let channel = null;
        if(!args.length) {
            channel = message.guild.channels.cache.find(channel => channel.id === message.channel.id);
        } else {
            if(message.mentions.channels.size < 1 && !message.guild.channels.cache.some(channel => channel.name === args[0])) return message.reply('You must mention a valid channel');
            channel = message.mentions.channels.size == 1 ? message.mentions.channels.first() : message.guild.channels.cache.find(channel => channel.name == args[0]);
        }
        
        if(channel) {
            config.Servers[message.guild.id].modChannelID = channel.id;
            fs.writeFile("./config.json", JSON.stringify(config), (err) => console.log(`Added ${channel.name} as mod channel at ${new Date().toLocaleString()}\nErrors: ${err}`));
            message.channel.send(`${channel.name} is configured as mod channel`)
        } else {
            message.reply("Something went wrong while configuring the mod channel")
        }
    }
}