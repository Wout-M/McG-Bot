module.exports = {
    name: "dice",
    category: "Fun",
    description: "Roll a dice with <number> sides",
    usage: "<number>",
    args: true,
    run(message, args){
        parseInt(args[0]) ? message.reply(`you rolled **${Math.floor((Math.random() * args[0])  + 1)}**`) : message.channel.send(`You did not give a correct number, ${message.author}`)        
    }
}