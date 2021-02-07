import { Price } from './types';

export const formatPriceEmbed: (price: Price) => string = price =>
  `close     : ${price.c}
      open      : ${price.o}
      high      : ${price.h}
      low       : ${price.l}
      volume    : ${price.v}
      percentage: ${price.cp}`;
