module.exports = {
    name: "uptime",
    category: "Admin",
    description: "Check how long the bot has been up",
    admin: true,
    run(message, args) {
        const timeString = (uptime) => {
            let milliseconds = uptime % 1000;
            let seconds = Math.floor((uptime / 1000) % 60);
            let minutes = Math.floor((uptime / (60 * 1000)) % 60);
            let hours = Math.floor((uptime / (60 * 60 * 1000)) % 24);
            let days = Math.floor((uptime / (24 * 60 * 60 * 1000)));

            return `${days} days, ${hours} hours, ${minutes} mins, ${seconds}s and ${milliseconds}ms`
        }
        message.channel.send(`I have been up for \`${timeString(message.client.uptime)}\``)

    }
}