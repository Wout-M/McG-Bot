const Discord = require("discord.js");
const fs = require("fs");
const chalk = require("chalk");
const { prefix, token, Servers, ownerID } = require("./config.json");

const client = new Discord.Client();
client.commands = new Discord.Collection();

console.log(chalk.underline("\nLoading commands"));
fs.readdirSync("./commands")
    .filter((file) => file.endsWith(".js"))
    .map((file) => {
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command);
        console.log(command.name);
    });

console.log(chalk.underline("\nLoading events"));
fs.readdirSync("./events")
    .filter((file) => file.endsWith(".js"))
    .map((file) => {
        const eventFunction = require(`./events/${file}`);
        if (eventFunction.disabled) return;

        const event = eventFunction.event || file.split(".")[0];
        const emitter = (typeof eventFunction.emitter === "string" ? client[eventFunction.emitter] : eventFunction.emitter) || client;
        const once = eventFunction.once;

        try {
            emitter[once ? "once" : "on"](event, (...args) => eventFunction.run(client, ...args));
        } catch (error) {
            console.error(error.stack);
        }

        console.log(event);
    });

client.elevation = message => {
    return (Servers[message.guild.id].modRoleID && 
        message.member.roles.cache.some(role => role.id == Servers[message.guild.id].modRoleID)) ||
        message.author.id == ownerID
}

client.login(token);
