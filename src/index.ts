import { CommandoClient } from 'discord.js-commando';
import { DetailPrice } from './commands/price/DetailPrice';
import { ListPrice } from './commands/price/ListPrice';

import config from './command-config.json';

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
client.login(`ODA3ODI4NjA4MjY1MzU1MjY0.YB9rBA.2sSucXD8sPfz5c2gx2QonutpoyI`);
