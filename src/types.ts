export type Price = {
  /**
   * coin name
   */
  n: string;

  /**
   * coin id
   */
  id: number;

  /**
   * coin code
   */
  cd: string;

  /**
   * close price
   */
  c: number;

  /**
   * last transaction type
   * 0 => buy
   * 1 => sell
   */
  tt: number;

  /**
   * high price
   */
  h: number;

  /**
   * low price
   */
  l: number;

  /**
   * open price
   */
  o: number;

  /**
   * volume
   */
  v: number;

  /**
   * change percentage
   */
  cp: number;
};

export type Coin = {
  id: number;
  accountcode: string;
  accountname: string;
  ico: number;
  discount: number;
  takerfee: number;
  minsend: number;
  maxsend: number;
  sendfee_internal: number;
  sendfee_external: number;
  smsfee: number;
  logo: string;
  digits: number;
  decimals: number;
  enablesendfund: number;
  enablebuy: number;
  enablesell: number;
};
