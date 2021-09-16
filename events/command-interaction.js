const { CommandInteraction } = require('discord.js');
/**
 * The main process controller for incoming commands.
 * @param {CommandInteraction} interaction
 */
async function commandInteraction(interaction) {
  if (!interaction) return;

  const { commandName } = interaction;

  if (commandName === 'qod') {
    try {
      const { default: fetch } = await import('node-fetch');
      const response = await fetch('https://quotes.rest/qod.json');
      const data = await response.json();
      const { quote, author } = data.contents.quotes[0];
      await interaction.reply(`As ${author} says, "${quote}"`);
      // This inspiration has been graciously provided by They Said So (theysaidso.com)
    } catch (error) {
      await interaction.reply('Try again later.');
    }
  }
}

module.exports = commandInteraction;
