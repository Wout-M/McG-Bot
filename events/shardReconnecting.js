const chalk =require("chalk");

module.exports = {
    name: "shardReconnecting",
    once: false,
    run(client, id) {
        console.log(chalk.green(`Reconnecting shard with ID ${id} at ${new Date().toLocaleString()}`))
    }
}