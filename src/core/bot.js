const { error } = require("./handleErrors");

class Bot {
  constructor(client) {
    this.client = client;
  }
  /**
   * ```js
   * const sphinx = require("sphinx-self");
   * const {token} = new sphinx.Core().createBot({token: "Token", name: "3yl"})
   * console.log(token)
   * ```
   * @param {string} token - The user token to create bots from
   * @param {string} name - The Bot name (Can be anything i think)
   * @param {boolean} enableIntents - A boolean value for the bot intents if u want them enabled or not.
   * @returns {Promise<object>}
   * @author Sphinx
   */
  createBot({ token, name, enableIntents = true}) {
    return new Promise((resolve, reject) => {
      if (!token)
        return reject(new error('syntax', 'A user token is required to run this function'));
      if (!name)
        return reject(new error('syntax', 'A Bot Name is required to run this function'));

      fetch('https://discord.com/api/v9/applications', {
        method: 'POST',
        headers: {
          "Authorization": token,
          "Content-Type": 'application/json'
        },
        body: JSON.stringify({
          name
        })
      })
        .then(request => request.json())
        .then(d => {
          if (d.message)
            return reject(new error("rate", 'Your account has been rate-limited. Could be because you\'ve been creating a lot of bots? Please wait ' + d.retry_after + " seconds"));

          fetch(`https://discord.com/api/v9/applications/${d.id}/bot`, {
            method: 'POST',
            headers: {
              "Authorization": token,
              "Content-Type": 'application/json'
            }
          })
            .then(res => res.json())
            .then(async dd => {
              fetch(`https://discord.com/api/v9/applications/${d.id}/bot/reset`, {
                method: 'POST',
                headers: {
                  "Authorization": token,
                  "Content-Type": 'application/json'
                },
              })
                .then(res => res.json())
                .then(data => {
                  fetch(`https://discord.com/api/v9/applications/${d.id}`, {
                    method: 'PATCH',
                    headers: {
                      "Authorization": token,
                      "Content-Type": 'application/json'
                    },
                    body: JSON.stringify({
                      bot_public: true,
                      bot_require_code_grant: false,
                      flags: enableIntents ? 565248 : 0
                    })
                  })
                    .then(res => res.json())
                    .then(async s => {
                      resolve(data);
                    });
                });
            });
        })
        .catch(error => reject(error));
    });
  }
}

module.exports = { Bot };
