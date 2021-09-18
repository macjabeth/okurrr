// Load environment variables
require('dotenv').config();

// We need this to load in files configurations
const fs = require('fs');

// The client starts our bot
const { Client, Collection, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Register commends from commands folder
client.commands = fs.readdirSync('./commands').reduce((acc, file) => {
  if (!file.endsWith('.js')) return acc;
  const command = require(`./commands/${file}`);
  return acc.set(command.data.name, command);
}, new Collection());

// Register events from events folder
fs.readdirSync('./events').forEach(file => {
  if (!file.endsWith('.js')) return;

  const event = require(`./events/${file}`);

  if (event.once) {
    client.once(event.name, event.execute);
  } else {
    client.on(event.name, event.execute);
  }
});

(async () => {
  // Deploy commands as a REST endpoint...
  // Seems pretty redundant considering we're having to
  // loop through the commands folder twice
  require('./deploy-commands')();

  // Lift off!
  client.login(process.env.TOKEN);
})();
