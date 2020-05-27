const { Servers } = require("../config.json");
const chalk = require("chalk")

module.exports = {
    event: "ready",
    once: true,
    run(client) {
        console.log(chalk.green.underline(`\nLogged in as ${client.user.tag} at ${new Date().toLocaleString()}`));
        client.user
            .setPresence({ activity: { name: "with magic" }, status: "dnd" })
            .then((presence) => {
                console.log(
                    `Activity set to "${presence.activities[0].type.toLowerCase()} ${
                        presence.activities[0].name
                    }"`
                );
                console.log(`Status set to "${presence.status}"`);
            })
            .catch((err) => console.log(err));
        
        for(server in Servers) {
            console.log(chalk.inverse(`\n${client.guilds.cache.get(server).name}`));
            !Servers[server].modRoleID ? console.log(chalk.red("\tAdd a mod role")) : console.log(chalk.inverse("\tMod role configured"))
            !Servers[server].modChannelID ? console.log(chalk.red("\tAdd a mod channel")) : console.log(chalk.inverse("\tMod channel configured"))
        }

    },
};
