const config = require('../config.json');
const fs = require("fs");

module.exports = {
    name: "prefix",
    category: "Admin",
    description: "Configure a new prefix",
    usage: "<new prefix>",
    args: true,
    admin: true,
    run(message, args) {
        if(args[0].size > 5) return message.reply("that prefix is too long");
        
        config.Servers[message.guild.id].Prefix = args[0];
        fs.writeFile("./config.json", JSON.stringify(config), (err) => `Changed prefix to "${args[0]}" at ${new Date().toLocaleString()}\nErrors: ${err}`)
        message.channel.send(`The new prefix is \`${config.Servers[message.guild.id].Prefix}\``)
    }
}