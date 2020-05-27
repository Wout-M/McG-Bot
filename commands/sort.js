const config = require("../config.json");
const fs = require("fs");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "sort",
    category: "Utility",
    description: "Sort yourself into a house",
    run(message, args) {
        let sortRoles = []
        if(config.Servers[message.guild.id].sortRoles) sortRoles = config.Servers[message.guild.id].sortRoles;

        if(!args.length) {
            if(message.member.roles.cache.some(role => sortRoles.includes(role.id))) return message.channel.send(`You've already been sorted, ${message.author}`)

            const listEmbed = new MessageEmbed()
                .setTitle("Choose a house to get sorted in")
                .setColor("#5d4037")
                .setAuthor(message.client.user.username, message.client.user.avatarURL())
                .setFooter("Created by Wout")
                .setTimestamp()
                .setDescription("Answer with the number of the house you want to get sorted in")
                .addField("Houses", sortRoles.map(sortRole => `[${sortRoles.indexOf(sortRole) + 1}] \`${message.guild.roles.cache.find(role => role.id == sortRole).name}\``).join(`\n`));

                const filter = msg => msg.author.id === message.author.id
                message.channel.send(listEmbed).then((msg) => {
                    message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 20000,
                        errors: ['time']
                    }).then(collected => {
                        if (parseInt(collected.first().content)) {
                            if (parseInt(collected.first().content) > sortRoles.length) return message.channel.send(`That number is not one of the options ${message.author}, please try again`)

                            const role = message.guild.roles.cache.find(role => role.id == sortRoles[parseInt(collected.first().content) - 1]);
                            message.member.roles.add(role);
                            msg.delete()
                            let color = ""

                            switch (role.name) {
                                case "Gryffindor":
                                    color = "#992d22"
                                    break;
                                case "Ravenclaw":
                                    color = "#3498db"
                                    break;
                                case "Hufflepuff":
                                    color = "#f1c40f"
                                    break;
                                case "Slytherin":
                                    color = "#2ecc71"
                                    break;
                            }

                            const sortedEmbed = new MessageEmbed()
                                .setTitle(`Welcome to ${role.name}, ${collected.first().author.username}`)
                                .setColor(color)
                                .setAuthor(message.client.user.username, message.client.user.avatarURL())
                                .setFooter("Created by Wout")
                                .setTimestamp()

                            collected.first().channel.send(sortedEmbed)
                                    
                        } else  message.channel.send(`Please try again and use one of the option numbers, ${message.author}`)
                    }).catch((err) => {
                        console.log(err)
                        message.channel.send(`Time ran out, ${message.author}`)
                    })
                })

        }else if(message.client.elevation(message)) {
            if(message.mentions.roles.size < 1 && !message.guild.roles.cache.some(role => role.name === args[1])) return message.reply('You must mention a valid role');
            const role = message.mentions.roles.size == 1 ? message.mentions.roles.first() : message.guild.roles.cache.find(role => role.name == args[1]);
            switch (args[0]) {
                
                case "add":
                    
                    if(sortRoles.includes(role.id)) return message.channel.send(`\`${role.name}\` is already a sorting role, ${message.author}`)
                    
                    sortRoles.push(role.id);
                    config.Servers[message.guild.id].sortRoles = sortRoles;
                    fs.writeFile("./config.json", JSON.stringify(config), (err) => console.log(err))
                    message.channel.send(`\`${role.name}\` has been added for sorting`)
                    break;

                case "remove":
                    if(!sortRoles.includes(role.id)) return message.channel.send(`\`${role.name}\` does not seem to be a sorting role, ${message.author}`)

                    sortRoles.splice(sortRoles.indexOf(role.id), 1)
                    config.Servers[message.guild.id].sortRoles = sortRoles;
                    fs.writeFile("./config.json", JSON.stringify(config), (err) => console.log(err))
                    message.channel.send(`\`${role.name}\` has been removed`)
                    break;

                default:
                    return;
            }
        }
    }
}