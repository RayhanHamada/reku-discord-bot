import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import locale from 'dayjs/locale/id';
import timezone from 'dayjs/plugin/timezone';

import config from './command-config.json';
import { Price } from './types';

export const formatPriceEmbed: (price: Price) => string = price =>
  `close     : ${price.c}
      open      : ${price.o}
      high      : ${price.h}
      low       : ${price.l}
      volume    : ${price.v}
      percentage: ${price.cp}`;

dayjs.locale(locale);
dayjs.extend(utc);
dayjs.extend(timezone);

export const getTimeNow = () =>
  dayjs().tz(config.timezone).format(config.timeFormat);
