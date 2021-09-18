const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const commands = fs.readdirSync('./commands').reduce((acc, file) => {
  if (!file.endsWith('.js')) return acc;
  const command = require(`./commands/${file}`);
  return [...acc, command.data.toJSON()];
}, []);

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

async function deployCommands() {
  try {
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      {
        body: commands
      }
    );

    console.log('Successfully registered application commands.');
  } catch (error) {
    console.error(error);
  }
}

module.exports = deployCommands;
