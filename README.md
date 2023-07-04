# About

sphinx-self is a solo made project for testing javascript syntax and discord api. It was made using [Node.js](https://nodejs.org) module to easily interact with [Discord API](https://discord.com/developers/docs/intro)

- Nice Syntax
- Easy to use
- 0 packages was used while making it.

## installation

**Node.js 16.9.0 or newer is required.**

```sh
npm install sphinx-self
```
## Example usage for **USER** Class for **AutoReaction**
```js
const Discord = require("discord.js-selfbot-v13") // npm i discord.js-selfbot-v13 (required)
const client = new Discord.Client({checkUpdate: false})
const sphinx = require("sphinx-self");

new sphinx.Core(client).autoReaction() //hover for options
sphinx.on("giveawayCreated", giveaway => {
    console.log(giveaway) //Returns giveaway message url (Where the giveaway was initalized.)
})

client.login("Your Discord Token") //Not saved.
```

## Example usage for **USER** Class for **leveling**
```js
const Discord = require("discord.js-selfbot-v13") // npm i discord.js-selfbot-v13 (required)
const client = new Discord.Client({checkUpdate: false})
const sphinx = require("sphinx-self");

new sphinx.Core(client).leveling() //hover for options

client.login("Your Discord Token") //Not saved.
```

## Making Bots using sphinx-self.
```js
const sphinx = require("sphinx-self");
const gen = new sphinx.Core();
(async() => {
    let {token} = await gen.createBot({token: "UserToken", name: "3yl"}) //CreateBot returns promise cuz i don't want people killing discord's api
    console.log(token) 
})()
```

### Contributing.

As this is a solo project i would like to see how other people would code this, So anyone who's intrested in adding things you're more than welcome to open a pull request by forking the github repo.

#### Help
I normally don't help people with solo projects but if you would like to ask any questions feel free to dm me on my discord (3yl). or join my **[Discord Server](https://discord.gg/rAgTGQkbG9)**

<br></br>

# More information.
**This is still a dev repo i'll add more feautres in the future**