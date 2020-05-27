module.exports = {
    name: "ping",
    category: "Utility",
    description: "Pong!",
    aliases: ["hey"],
    run(message, args) {
        message.channel.send("Yes?")
            .then(msg => msg.edit(`Hi \`${msg.createdTimestamp - message.createdTimestamp} ms\``))
    }
}