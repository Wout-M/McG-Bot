const { MessageAttachment } = require("discord.js");

module.exports = {
    name: "boom",
    category: "Fun",
    description: "Boom",
    run(message, args) {
        const attachment = new MessageAttachment(
            "https://media.tenor.com/images/5fab25acb69fae9527f9df81d5fb8f15/tenor.gif"
        );
        message.channel.send(attachment);
    },
};
