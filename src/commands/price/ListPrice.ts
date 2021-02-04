import got from 'got';
import { Message, MessageEmbed } from 'discord.js';
import { Client, Command, CommandoMessage } from 'discord.js-commando';

import endpoints from '../../reku-endpoints.json';
import { Price } from '../../types';

export default class ListPrice extends Command {
  constructor(client: Client) {
    super(client, {
      name: 'lprice',
      description: 'list prices',
      group: 'price',
      memberName: 'list price',
    });
  }

  public async run(msg: CommandoMessage): Promise<Message | Message[] | null> {
    const date = new Date(msg.createdTimestamp);
    const dateStr = `${date.toLocaleString()}`;

    if (!msg.author.bot) {
      let embed: MessageEmbed;

      // get data of current price
      await got
        .get(endpoints.price)
        .json<Price[]>()
        .then(prices => {
          embed = new MessageEmbed();

          prices.forEach((price, idx) => {
            if (idx % 12 !== 0) {
              embed.addField(price.cd, this.formatEmbed(price), true);
              return;
            }

            msg.reply(embed);
            embed = new MessageEmbed();
            embed.setTitle(`Price per ${dateStr}`);
            embed.addField(price.cd, this.formatEmbed(price), true);
          });
          msg.reply(embed);
        })
        .catch(() => {
          embed.setColor('#ff0000').setDescription('');
        });

      return null;
    }

    return null;
  }

  private formatEmbed(price: Price) {
    return `close     : ${price.c}
      open      : ${price.o}
      high      : ${price.h}
      low       : ${price.l}
      volume    : ${price.v}
      percentage: ${price.cp}`;
  }
}
