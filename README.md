# McGonagall Bot
McG Bot is a Discord bot that can be used, as the name suggests, for a Harry Potter themed server.

Some features:
* Sort people into a house role
* Give people a year role on joining
* Check and delete messages with banned words
* Ban, kick or mute members
* Purge messages
* Some fun commands like:
    * 8-ball
    * Birthday reminders
    * Hug someone or give them a cookie
    * Quiz

## Usage
You can easily run this bot from your own pc, but you'll need a few things first.

### Prerequisites
#### Node.js
The bot is written with a few [Node.js](https://nodejs.org/en/) packages, namely:
* [Axios](https://github.com/axios/axios)
* [Chalk](https://www.npmjs.com/package/chalk)
* [Discord.js](https://discord.js.org/#/)
* [Moment](https://momentjs.com/)
* [Set-interval-async](https://www.npmjs.com/package/set-interval-async)
 
First, install [Node.js](https://nodejs.org/en/). Then, open a Terminal in the cloned repo folder and run `npm install`

#### Discord
Before you can run a bot on Discord, you need to create an application that is linked to your account. You can do this by surfing to [this site](https://discord.com/developers/applications/) and using the `New Application` button in the top right. 

After you've done that, you can go to the `Bot` tab and find your bot token. **Warning!** Do not share this token with anyone. Next up, open the config.json file and edit these two lines:
* `"token":""` to `"token":"yourtoken"`
* `"ownerID":""` to `"owernID":"youraccountid"`

The other parts of the file will be automatically generated once it joins a server.

### Deployment
The hardest part is done now, deploying a bot is super easy:
* Open a terminal in the cloned repo folder and run `node KGB.js`
* Create an invite link for the bot [here](https://discordapi.com/permissions.html) with the id of your bot. Make sure you have the `Administrator`permission checked if you want to use all its functions.

That's it! Now your bot will run as long as the terminal is open. You can close the terminal to stop the bot and restart the bot by repeating the first step.

**Some things you might want to do when it joins your server:**
* Get a list with all the commands, what they do and how to use them by typing `)help`
* Configure a mod channel for the ban/kick notifications.
* Configure a mod role so all your admins can use those commands
* Add year roles
* Configure roles for sorting


Any suggestions for new features or improvements are always welcome!