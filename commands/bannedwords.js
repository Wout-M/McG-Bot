const config = require("../config.json");
const { MessageEmbed } = require("discord.js");
const fs = require("fs");

module.exports = {
    name: "bannedwords",
    category: "Admin",
    description: "Add or list banned words that I can detect",
    aliases: ["bw"],
    usage: "[add <word>] [list]",
    args: true,
    admin: true,
    run(message,args) {
        let bannedWords = []
        if(config.Servers[message.guild.id].bannedWords) bannedWords = config.Servers[message.guild.id].bannedWords;

        switch (args[0]){
            case "list":
                const listEmbed = new MessageEmbed()
                    .setTitle("Here's a list of banned words")
                    .setColor("#b71c1c")
                    .setAuthor(message.client.user.username, message.client.user.avatarURL())
                    .setFooter("Created by Wout")
                    .setTimestamp()
                    .setDescription(bannedWords.map(word => `- \`${word.toString()}\``).join(`\n`));

                message.channel.send(listEmbed)
                break;
            
            case "add":
                if (!args[1]) return message.channel.send(`You did not give me a word to ban, ${message.author}`);
                if(bannedWords.includes(args[1])) return message.channel.send(`\`${args[1]}\` has already been banned, ${message.author}`)

                bannedWords.push(args[1])
                config.Servers[message.guild.id].bannedWords = bannedWords;
                fs.writeFile("./config.json", JSON.stringify(config), (err) => console.log(`Added ${args[1]} as banned word at ${new Date().toLocaleString()}\nErrors: ${err}`))
                message.channel.send(`\`${args[1]}\` has been banned`)
                break;
            
            case "remove":
                if (!args[1]) return message.channel.send(`You did not give me a word to remove, ${message.author}`);
                if(!bannedWords.includes(args[1])) return message.channel.send(`\`${args[1]}\` does not seem to be banned, ${message.author}`)

                bannedWords.splice(bannedWords.indexOf(args[1]), 1)
                config.Servers[message.guild.id].bannedWords = bannedWords;
                fs.writeFile("./config.json", JSON.stringify(config), (err) => console.log(`Removed ${args[1]} as banned word at ${new Date().toLocaleString()}\nErrors: ${err}`))
                message.channel.send(`\`${args[1]}\` has been removed`)
                break;

            default:
                return;
        }

    }
}