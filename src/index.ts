import { CommandoClient } from 'discord.js-commando';
import config from './command-config.json';

const client = new CommandoClient({
  commandPrefix: config.prefix,
});

client.registry.registerDefaultCommands();

