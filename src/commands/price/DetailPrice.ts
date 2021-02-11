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
      description: 'show one or more price',
      memberName: 'dprice',
    });
  }

  public async run(
    msg: CommandoMessage,
    args: string[]
  ): Promise<Message | Message[] | null> {
    if (!msg.author.bot) {
      if (!args.length) return msg.reply('please provide a coin !');

      // get available coins on rekeningku
      const rekuCoins = await got
        .get(endpoints.coins)
        .json<{ result: Coin[] }>();

      // get only the specific coin from argument
      const coins = rekuCoins.result.filter(coin =>
        args.includes(coin.accountcode.toLowerCase())
      );

      if (!coins.length) return msg.reply(`Coin not found`);

      const coinsCode = coins.map(coin => coin.accountcode.toLowerCase());

      // get coin price
      const rekuPrices = await got.get(endpoints.price).json<Price[]>();

      const price = rekuPrices.filter(p =>
        coinsCode.includes(p.cd.toLowerCase())
      );

      const embed = new MessageEmbed();
      embed.setTitle(`Price per ${getTimeNow()}`);

      price.forEach(p => embed.addField(p.cd, formatPriceEmbed(p), true));

      return msg.reply(embed);
    }
    return null;
  }
}
