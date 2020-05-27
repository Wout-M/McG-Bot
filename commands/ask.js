module.exports = {
    name: "ask",
    category: "Fun",
    description: "Ask me a question",
    aliases: ["8ball"],
    usage: "<question>",
    args: true,
    run(message, args) {
        const answers = [
            "Yes",
            "No",
            "Maybe?",
            "If i tell you i'd need to ban you",
            "The person next to you will answer that",
            "Why would you even ask that?",
            "Uhm...",
            "Of course",
            "*Looks at you sternly*",
            "Oh, look! What a lovely weather it is today",
            "Why are you asking me? Look it up in the library",
            "If all planets align, then...maybe",
            "Ask again later, i don't have time now",
            "To quote Shakespeares Hamlet, Act 2, Scene 4, Verse 48: no",
            "I dont quite get your question, it doesnt make sense to me",
        ];

        message.channel.send(answers[Math.floor(Math.random() * answers.length)])
    },
};
