const { MessageEmbed } = require("discord.js")
const { Servers } = require("../config.json");

module.exports = {
    name: "help",
    category: "Utility",
    description: "List all my commands or info about a specific comand",
    aliases: ["commands", "h"],
    usage: "[command name]",
    run(message, args) {
        const helpEmbed = new MessageEmbed()
            .setColor("#004d40")
            .setAuthor(message.client.user.username, message.client.user.avatarURL())
            .setFooter("Created by Wout")
            .setTimestamp();
        const { commands } = message.client;
        const prefix = Servers[message.guild.id].Prefix

        if (!args.length) {
            helpEmbed.setTitle("Here's a list of all my commands")

            const groupedCommands = commands.reduce((grouped, command) => {
                if(command.admin) {
                    if(message.client.elevation(message)) {
                        if(!grouped[command.category]) grouped[command.category] = []
                        grouped[command.category].push(command)
                    }
                } else {
                    if(!grouped[command.category]) grouped[command.category] = []
                    grouped[command.category].push(command)
                }
                
                return grouped
            }, {})
            
            sortedCommands = Object.keys(groupedCommands)
                .sort()
                .reduce((sorted, key) => {
                    sorted[key]= groupedCommands[key]
                    return sorted
            }, {})

            for(category in sortedCommands){
                helpEmbed.addField(category, sortedCommands[category].map((command) => `\`${command.name}\`\t${command.description}`).join('\n'))
            }
        } 
        else {
            const commandName = args[0].toLowerCase();
            const command = commands.get(commandName) || commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
            if (!command) return message.channel.send(`That's not a valid command, ${message.author}!`)
            
            helpEmbed.setTitle(command.name);
            if (command.description) helpEmbed.setDescription(command.description);
            if (command.aliases) helpEmbed.addField(`Aliases`,command.aliases.join(', '));
            helpEmbed.addField(`Usage`, `\`${prefix}${command.name}${command.usage ? ` ${command.usage}` : ""}\``);
        }

        message.channel.send(helpEmbed)
        
    },
};
