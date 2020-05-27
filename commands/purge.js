module.exports = {
    name: "purge",
    category: "Admin",
    description: "Delete <number> amount of messages",
    usage: "<number>",
    args: true,
    admin: true,
    run(message, args) {
        parseInt(args[0])
            ? parseInt(args[0]) > 50
                ? message.channel.send(`That number is too big, ${message.author}`)
                : message.channel.messages.fetch({limit: args[0]}).then(messages => message.channel.bulkDelete(messages)).then(message.channel.send(`Deleted \`${args[0]}\` messages`).then(msg => msg.delete({timeout: 3000})))
            : message.channel.send(`You did not give a correct number, ${message.author}`);
    },
};
