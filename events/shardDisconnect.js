const chalk = require("chalk");

module.exports = {
    name: "shardDisconnect",
    once: false,
    run(client, event, id) {
        console.log(chalk.red(`Shard with ID ${id} is connected at ${new Date().toLocaleString()}`))
    }
}