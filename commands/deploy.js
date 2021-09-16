const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const commands = [
  new SlashCommandBuilder()
    .setName('qod')
    .setDescription('Replies with an inspirational quote for the day.')
].map(command => command.toJSON());

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
