import { Message, MessageEmbed } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import got from 'got';

import endpoints from '../../reku-endpoints.json';
import { Coin, Price } from '../../types';
import { formatPriceEmbed, getTimeNow } from '../../utils';

export class DetailPrice extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'dprice',
      group: 'price',
      description: 'show a price',
      memberName: 'dprice',
    });
  }

  public async run(
    msg: CommandoMessage,
    args: string
  ): Promise<Message | Message[] | null> {
    if (!msg.author.bot) {
      if (!args) return msg.reply('please provide a coin !');

      // get available coins on rekeningku
      const coins = await got.get(endpoints.coins).json<{ result: Coin[] }>();

      const coin = coins.result.find(
        coin => coin.accountcode.toLowerCase() === args.toLowerCase()
      );

      if (!coin) return msg.reply(`Coin ${args} not found`);

      // get coin price
      const price = await got
        .get(`${endpoints.price}/${coin.id}`)
        .json<Price>();

      const embed = new MessageEmbed();

      embed.setTitle(`Price of ${coin.accountcode} per ${getTimeNow()}`);
      embed.addField(price.cd, formatPriceEmbed(price));

      return msg.reply(embed);
    }
    return null;
  }
}
