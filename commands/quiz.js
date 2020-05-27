const axios = require("axios")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "quiz",
    category: "Fun",
    description: "Answer a trivia question",
    aliases: ["q", "trivia"],
    run(message, args) {
        axios.get("https://opentdb.com/api.php?amount=1&type=multiple")
            .then(response => {
                const question = response.data.results[0].question;
                const answers = response.data.results[0].incorrect_answers;
                const correct = response.data.results[0].correct_answer;
                answers.push(correct);

                for (let i = answers.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [answers[i], answers[j]] = [answers[j], answers[i]];
                }

                const quizEmbed = new MessageEmbed()
                    .setAuthor(`${message.author.username}'s question`, message.client.user.avatarURL())
                    .setTitle(((question.replace(/&quot;/g, '"')).replace(/&#039;/g, `'`)).replace(/&amp;/g, '&'))
                    .setColor("#fdd835")
                    .setFooter("You have 20 seconds to answer | Answer with a number or the text")
                    .setDescription(answers.map(answer => `[${answers.indexOf(answer) + 1}] ${((answer.replace(/&quot;/g, '"')).replace(/&#039;/g, `'`)).replace(/&amp;/g, '&')}`).join(`\n`))
                    .addField("Category", response.data.results[0].category, true)
                    .addField("Difficulty", response.data.results[0].difficulty, true);
                
                const filter = msg => msg.author.id === message.author.id
                message.channel.send(quizEmbed).then(() => {
                    message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 20000,
                        errors: ['time']
                    }).then(collected => {
                        parseInt(collected.first().content) 
                            ? parseInt(collected.first().content - 1) === answers.indexOf(correct)
                                ? message.channel.send(`You answered correctly, ${message.author}!`)
                                : (parseInt(collected.first().content)) > answers.length
                                    ? message.channel.send(`That number is not one of the options`)
                                    : message.channel.send(`${((answers[parseInt(collected.first().content) - 1].replace(/&quot;/g, '"')).replace(/&#039;/g, `'`)).replace(/&amp;/g, '&')} is not the correct answer, ${message.author}`)
                            : collected.first().content.toLowerCase() === correct.toLowerCase()
                                ? message.channel.send(`You answered correctly, ${message.author}!`)
                                : answers.some(answer => answer.toLowerCase() === collected.first().content.toLowerCase())
                                    ? message.channel.send(`${collected.first().content} is not the correct answer, ${message.author}`)
                                    : message.channel.send(`Looks like you gave an answer that is not part of the options, ${message.author}`)
                    }).catch(err => {
                        message.channel.send(`Time ran out, ${message.author}`)
                    })
                })
            })
    }
}