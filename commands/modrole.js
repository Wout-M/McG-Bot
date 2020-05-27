const config = require("../config.json");
const fs = require("fs");

module.exports = {
    name: "modrole",
    category: "Admin",
    description: "Configure the admin role",
    aliases: ["mr", "adminrole"],
    usage: "<role>",
    args: true,
    admin: true,
    run(message, args) {
        if(message.mentions.roles.size < 1 && !message.guild.roles.cache.some(role => role.name === args[0])) return message.reply('You must mention a valid role');
        const role = message.mentions.roles.size == 1 ? message.mentions.roles.first() : message.guild.roles.cache.find(role => role.name == args[0]);

        config.Servers[message.guild.id].modRoleID = role.id;
        fs.writeFile("./config.json", JSON.stringify(config), (err) => console.log(`Added ${role.name} as mod role at ${new Date().toLocaleString()}\nErrors: ${err}`));
        message.channel.send(`${role.name} is configured as mod role`)
    }
}