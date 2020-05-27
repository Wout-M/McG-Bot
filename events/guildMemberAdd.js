const  { Servers } = require("../config.json");
const chalk = require("chalk");

module.exports = {
    name: "guildMemberAdd",
    once: false,
    run(client, member) {
        const modChannel = member.guild.channels.cache.find(channel => channel.id == Servers[member.guild.id].modChannelID) 
            ? client.channels.cache.get(Servers[member.guild.id].modChannelID) 
            : null
        if (!modChannel) return console.log(chalk.red("Configure a mod channel"))
    
        const roleFilter = role => role.name == new Date().getFullYear().toString();
        member.guild.roles.cache.some(roleFilter) 
            ? member.roles.add(member.guild.roles.cache.find(roleFilter)) 
            : modChannel.send('There is no year role configured')
    }
}   