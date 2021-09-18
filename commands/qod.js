const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('qod')
    .setDescription('Replies with an inspirational quote for the day.'),

  // This inspirational quote has been provided to you by...
  // They Said So (theysaidso.com)
  async execute(interaction) {
    const { default: fetch } = await import('node-fetch');
    const response = await fetch('https://quotes.rest/qod.json');
    const data = await response.json();
    const { quote, author } = data.contents.quotes[0];
    await interaction.reply(`In the words of ${author}, "${quote}"`);
  }
};
