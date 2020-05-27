const { setIntervalAsync } = require("set-interval-async/dynamic");
const { clearIntervalAsync } = require("set-interval-async");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const config = require("../config.json");
const fs = require("fs");
let timer;
let user;
let birthdays;
let day;

module.exports = {
    name: "birthday",
    category: "Fun",
    description: "Automatic birthday wishes",
    aliases: ["bday"],
    usage: "list",
    args: false,
    run(message, args) {
        if(args[0] === "list"){
            birthdays = config.Servers[message.guild.id].birthdays ? Object.entries(config.Servers[message.guild.id].birthdays) : []

            birthdays.sort(function(a,b) {
                a = a[1].split('/').reverse().slice(1).join('');
                b = b[1].split('/').reverse().slice(1).join('');
                return a > b ? 1 : a < b ? -1 : 0;
            })

            const bdaytext = birthdays.map(birthday => `\`${birthday[1]}\`: ${message.guild.members.cache.get(birthday[0]).user.username}`).join('\n');

            const birthdayListEmbed = new MessageEmbed()
                .setAuthor(message.client.user.username, message.client.user.avatarURL())
                .setTitle(`Here's a list of everyones birthday`)
                .setDescription(bdaytext)
                .setColor("#5e35b1")
                .setFooter("Created by Wout")
                .setTimestamp()

            message.channel.send(birthdayListEmbed)
        } else if (message.client.elevation(message)) {
            switch(args[0]) {
                case "start":
                    if(timer ? timer.stopped : !timer) {
                        timer = setIntervalAsync(() => {
                            const today = moment().format('DD/MM/YYYY')
                            if(today !== day) {
                                if(!config.Servers[message.guild.id].birthdayChannelID) return message.reply("Please configure a birthday channel")
                                if(!config.Servers[message.guild.id].birthdayRoleID) return message.reply("Please configure a birthday role")
                                
                                const bdayRoleID = config.Servers[message.guild.id].birthdayRoleID;
                                const members = message.guild.members.cache.filter(member => member.roles.cache.some(role => role.id === bdayRoleID))
                                
                                if(members.size > 0) {
                                    members.each(birthdaymember => {
                                        birthdaymember.roles.remove(message.guild.roles.cache.get(bdayRoleID));
                                    });
                                }

                                birthdays = config.Servers[message.guild.id].birthdays 
                                ? Object.entries(config.Servers[message.guild.id].birthdays)
                                    .filter(birthday => birthday[1].substring(0,5) === today.substring(0,5)) 
                                : []

                                birthdays.map(bday => message.guild.members.cache.get(bday[0]).roles.add(message.guild.roles.cache.get(bdayRoleID)));

                                if(birthdays.length) {
                                    const bdaybois = birthdays.map(bdayboi => `${message.guild.members.cache.get(bdayboi[0]).user.username} turned ${new Date().getFullYear() - parseInt(bdayboi[1].substring(6, bdayboi[1].length))} years old today!`).join('\n')
                                    const bdayChannel = message.client.channels.cache.get(config.Servers[message.guild.id].birthdayChannelID);
                                    const birthdayEmbed = new MessageEmbed()
                                        .setAuthor(message.client.user.username, message.client.user.avatarURL())
                                        .setTitle(`Congratulations!!`)
                                        .setDescription(`It is someones birthday today :tada::tada:`)
                                        .setColor("#f9a825")
                                        .setFooter("Created by the Wout")
                                        .setTimestamp()
                                        .addField("The birthday people", bdaybois);
                                    
                                    bdayChannel.send(birthdayEmbed)
                                }

                                day = today;
                            }
                        }, 3600000);
                        message.channel.send(`Started checking for birthdays`);
                    } else {
                        message.channel.send(`Birthday checking has already been started, ${message.author}`)
                    }
                   
                    break;
                    
                case "stop":
                    clearIntervalAsync(timer);
                    message.channel.send(`Stopped checking for birthdays`);
                    break;
    
                case "add":
                    if(message.mentions.users.size < 1) return message.reply('You must mention someone to add their birthday');
                    user = message.mentions.users.first()
    
                    if(!args[2]) return message.reply(`You must provide a birthday`)
    
                    const birthday = moment(args[2], 'DD/MM/YYYY', true).format('DD/MM/YYYY')
                    if(birthday === "Invalid date") return message.reply(`You must provide a valid date as birthday`)
                    
                    birthdays = config.Servers[message.guild.id].birthdays ? config.Servers[message.guild.id].birthdays : {}
                    birthdays[user.id] = birthday
    
                    config.Servers[message.guild.id].birthdays = birthdays;
    
                    fs.writeFile("./config.json", JSON.stringify(config), (err) => console.log(`Added ${user.username}'s birthday at ${new Date().toLocaleString()}\nErrors: ${err}`));
                    message.channel.send(`${user.username}'s birthday \`${birthday}\` has been added`);
                    break;
                
                case "remove":
                    if(message.mentions.users.size < 1) return message.reply('You must mention someone to remove their birthday');
                    user = message.mentions.users.first()
                    birthdays = config.Servers[message.guild.id].birthdays ? config.Servers[message.guild.id].birthdays : {}
    
                    if(!Object.keys(birthdays).includes(user.id)) return message.reply(`${user.username} does not seem to have their birthday added`);
    
                    delete birthdays[user.id];
                    config.Servers[message.guild.id].birthdays = birthdays;
    
                    fs.writeFile("./config.json", JSON.stringify(config), (err) => console.log(`Removed ${user.username}'s birthday at ${new Date().toLocaleString()}\nErrors: ${err}`));
                    message.channel.send(`${user.username}'s birthday has been removed`);
                    break;
    
                case "channel":
                    if(message.mentions.channels.size < 1 && !message.guild.channels.cache.some(channel => channel.name === args[1])) return message.reply('You must mention a valid channel');
                    const channel = message.mentions.channels.size == 1 ? message.mentions.channels.first() : message.guild.channels.cache.find(channel => channel.name == args[1]);
    
                    if(channel) {
                        config.Servers[message.guild.id].birthdayChannelID = channel.id;
                        fs.writeFile("./config.json", JSON.stringify(config), (err) => console.log(`Added ${channel.name} as birthday channel at ${new Date().toLocaleString()}\nErrors: ${err}`));
                        message.channel.send(`${channel.name} is configured as birthday channel`)
                    } else {
                        message.reply("Something went wrong while configuring the birthday channel")
                    }
                    break;

                case "role":
                    if(message.mentions.roles.size < 1 && !message.guild.roles.cache.some(role => role.name === args[1])) return message.reply('You must mention a valid role');
                    const role = message.mentions.roles.size == 1 ? message.mentions.roles.first() : message.guild.roles.cache.find(role => role.name == args[1]);

                    if(role) {
                        config.Servers[message.guild.id].birthdayRoleID = role.id;
                        fs.writeFile("./config.json", JSON.stringify(config), (err) => console.log(`Added ${role.name} as birthday role at ${new Date().toLocaleString()}\nErrors: ${err}`));
                        message.channel.send(`${role.name} is configured as birthday role`)
                    } else {
                        message.reply("Something went wrong while configuring the birthday role")
                    }
                    break;
                default:                
                    return;
            }
        }
        
           
        
    }
}
