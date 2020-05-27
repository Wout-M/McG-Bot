const config = require("../config.json");
const chalk = require('chalk');
const { MessageAttachment } = require("discord.js");

module.exports = {
    name: "message",
    once: false,
    run(client, message) {
        if (message.author.bot || message.channel.type !== "text" || message.channel.type === "dm") return;

        const prefix = config.Servers[message.guild.id].Prefix;

        if(!message.content.startsWith(prefix)) {
            let includes = []
            if(config.Servers[message.guild.id].bannedWords) includes = config.Servers[message.guild.id].bannedWords.filter(word => message.content.toLowerCase().includes(word))
            if(includes.length) {
                message.delete()
                message.channel.send(`That word has been banned, ${message.author}!`, new MessageAttachment("https://media.giphy.com/media/FYenMRUx3LGy4/giphy.gif"))
            }
        } else {
            const args = message.content.slice(prefix.length).split(/ +/);
            const commandName = args.shift().toLowerCase();
    
            const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
            if (!command) return
    
            if (command.args && !args.length) {
                let reply = `You didn't provide any arguments, ${message.author}`;
    
                if (command.usage) {
                    reply += `\nThe correct usage is: \`${prefix}${command.name} ${command.usage}\``;
                }
                return message.channel.send(reply);
            }
    
    
            try {
                command.admin 
                    ? client.elevation(message) 
                        ? command.run(message, args) 
                        : message.channel.send(`You don't have the permissions to use this command, ${message.author}`)
                    : command.run(message,args)
            } catch (error) {
                console.error(error);
                message.reply("There was an error trying to execute that command");
            }
        }
    },
};
