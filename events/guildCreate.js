const config = require("../config.json");
const fs = require("fs");

module.exports = {
    name: "guildCreate",
    once: false,
    run(client, guild){
        const guildId = guild.id

        if(!config.Servers[guild.id]) config.Servers[guild.id] = {"Name": guild.name.toString(), "Prefix": config.prefix};

        fs.writeFile("./config.json", JSON.stringify(config), (err) => console.log(err))
        console.log(`Joined ${guild.name.toString()} at ${new Date().toLocaleString()}`)
    }
    
}