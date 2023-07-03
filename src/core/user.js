const { EventEmitter } = require("node:events");
const {error} = require("./handleErrors")
const wait = require("node:timers/promises").setTimeout;
const {bot} = require("./bot")

class User extends bot {
    constructor(client) { super(client) ;this.client = client; }
    #server() {
        console.log("This Package was made by `3yl`. For Questions about it you can dm me or join this server `discord.gg/rAgTGQkbG9`")
    }
    /**
     * Auto Reaction for user accounts
     * @param {string} sessionid - SessionID. Don't change if you don't know what that is
     * @param {Array} customBotId - An Array of customBot ID's
     * @param {string} reactionName - Don't change if you don't understand what that is.
     * @param {number} timeout - The timeout between each giveaway
     * @param {Array} blacklistedwords - Black Listed words to not join the giveaway if the words exists in the giveaway embed.
     * @returns {void}
     * @author Sphinx
     */
    autoReaction(options = {}) {
        const { sessionid = '636e16489c6fd773fbb37bdb212ecf3a', customBotId, reactionName, timeout = 5000, blacklistedwords = [] } = options;
        this.#server()
        if(!Array.isArray(blacklistedwords)) return console.error(new error('syntax', 'blacklistedwords must be an array'));
        this.client.on("messageCreate", async(message) => {
            if(message.author.id === '294882584201003009') {
                if(!message.embeds[0]) return;
                if(message.content.startsWith('Congratulations')) return;
                //Checking if the embed is a giveaway embed;
                if(!message.embeds[0]?.description?.includes('Ends')) return;
                if(blacklistedwords.includes(message.embeds[0]?.title)) return;
                await wait(timeout);
                await fetch('https://discord.com/api/v9/interactions', {
                    method: 'POST',
                    body: JSON.stringify({
                        application_id: '294882584201003009',
                        channel_id: message.channel.id,
                        data: {
                            component_type: 2,
                            custom_id: 'enter-giveaway'
                        },
                        guild_id: message.guild.id,
                        message_flage: 0,
                        message_id: message.id,
                        type: 3,
                        session_id: sessionid
                    }),
                    headers:{
                        "Authorization": this.client.token,
                        "Content-Type": 'application/json'
                    }
                }).then(data => {
                    const giveawayData = {url: message.url}
                    eventEmitter.emit("giveawayCreated", giveawayData);
                })
                
            }
            if(message.author.id === '396464677032427530') {
                if(!message.embeds[0]) return;
                if(!message.embeds[0]?.title?.includes(':tada:')) return;
                if(blacklistedwords.includes(message.embeds[0]?.title)) return;
  
                await wait(timeout)
                message.react('🎉').then(_ => {
                    this.emit('giveawayCreated', {url: message.url})
                })
            }
            if(message.author.id === '606026008109514762') {
                if(!message.embeds[0]) return;
                if(!message.embeds[0]?.description?.includes('Hosted')) return;
                if(blacklistedwords.includes(message.embeds[0]?.title)) return;
                await wait(timeout)
                message.reactions.cache.forEach(async react => {
                    if(react._emoji.name !== 'giveaways') return;
                    message.react(react._emoji).then(_ => this.emit('giveawayCreated', {url: message.url}))
                })
            }
            if(customBotId) {
                if(!Array.isArray(customBotId)) return console.error(new error('syntax', 'customBotId must be an array filled with bot id\'s'))
                if(customBotId?.includes(message.author.id)) {
                    if(blacklistedwords.includes(message.embeds[0]?.title)) return;
                    if(!message.embeds[0]) return;
                    await wait(timeout)
                    message.reactions.cache.forEach(async react => {
                        if(reactionName) {
                            if(react._emoji.name !== reactionName) return;
                        }
                        message.react(react._emoji).then(_ => this.emit('giveawayCreated', {url: message.url}))
                    })
                }
            } else return;
        })
    }
    /**
     * 
     * @param {string} channel - The Channel ID for the bot to spam in. 
     * @param {boolean} randomLetters - Indicate if you want the bot to spam random letters or existing words in the dictionary
     * @param {number} time - A time between each message in ms
     * @param {string} type - The language you want the bot to spam in. [ar-eng]
     */
    leveling(options = {}) {
        const { channel, randomLetters = false, time = 15000, type = 'eng'} = options;
        this.#server();
        if(!channel) return console.error(new error("syntax", 'A Channel ID must be provided for the leveling module'));
        if(type === 'eng') {
            function makeid(length) {
                var result = "";
                var characters =
                  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                var charactersLength = characters.length;
                for (var i = 0; i < length; i++) {
                  result += characters.charAt(
                    Math.floor(Math.random() * charactersLength)
                  );
                }
                return result;
              }
              let arrayOfMostUsedWords = require("./languages.json").eng;
              this.client.on("ready", async() => {
                    let mainChannel = await this.client.channels.fetch(channel);
                    setInterval(async() => {
                        await mainChannel.send(randomLetters ? makeid(Math.floor((Math.random() * 15) + 1)) : arrayOfMostUsedWords[Math.floor(Math.random() * arrayOfMostUsedWords.length)])
                    }, time)
              })
        } else if(type === 'ar') {
            function makeid(length) {
                var result = "";
                var characters =
                  "ابتثجحخدذرزسشصضطظعغفقكلمنهويء";
                var charactersLength = characters.length;
                for (var i = 0; i < length; i++) {
                  result += characters.charAt(
                    Math.floor(Math.random() * charactersLength)
                  );
                }
                return result;
              }
              let arrayOfMostUsedWords = require('./languages.json').ar;
              this.client.on("ready", async() => {
                let mainChannel = await this.client.channels.fetch(channel);
                setInterval(async() => {
                    await mainChannel.send(randomLetters ? makeid(Math.floor((Math.random() * 15) + 1)) : arrayOfMostUsedWords[Math.floor(Math.random() * arrayOfMostUsedWords.length)])
                }, time)
              })
        }
    }
}
const eventEmitter = new EventEmitter();
module.exports = {User, eventEmitter}