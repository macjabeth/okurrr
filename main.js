// Load environment variables
require('dotenv').config();

// Require the necessary dependencies
const { Client, Intents } = require('discord.js');
const deployCommands = require('./commands/deploy');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => console.log('Ready!'));

client.on('interactionCreate', require('./events/command-interaction'));

(async () => {
  // Register any commands we've defined
  await deployCommands();

  // Login to Discord with your client's token
  client.login(process.env.TOKEN);
})();
