import { CommandoClient } from 'discord.js-commando';
import { ListPrice } from './commands/price/ListPrice';

const client = new CommandoClient({
  commandPrefix: '$',
});

client.registry
  .registerDefaultTypes()
  .registerGroup({ id: 'price', name: 'price' })
  .registerDefaultGroups()
  .registerDefaultCommands()
  .registerCommands([ListPrice]);

client.on('ready', () => {
  console.log(`im ready !`);
});

// insert your bot token here !
client.login(process.env.TOKEN);
