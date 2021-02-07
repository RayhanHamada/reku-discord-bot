import { CommandoClient } from 'discord.js-commando';
import { DetailPrice } from './commands/price/DetailPrice';
import { ListPrice } from './commands/price/ListPrice';

import config from "./command-config.json";

const client = new CommandoClient({
  commandPrefix: config.prefix,
});

client.registry
  .registerDefaultTypes()
  .registerGroup({ id: 'price', name: 'price' })
  .registerDefaultGroups()
  .registerDefaultCommands()
  .registerCommands([ListPrice, DetailPrice]);

client.on('ready', () => {
  console.log(`im ready !`);
});

// insert your bot token here !
client.login(process.env.TOKEN);

