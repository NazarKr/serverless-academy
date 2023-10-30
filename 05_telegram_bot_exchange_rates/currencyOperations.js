import axios from "axios";
import NodeCache from "node-cache";
export const myCache = new NodeCache();

const currencyCodes = [840, 978];

export async function getCurrency() {
  try {
    const currencyRates = await axios.get(
      `https://api.monobank.ua/bank/currency`
    );
    const filteredRates = currencyRates.data
      .filter((item) => currencyCodes.includes(item.currencyCodeA))
      .slice(0, 2);
    if (filteredRates !== undefined) {
      myCache.set("currency", filteredRates);
    }
    return filteredRates;
  } catch (error) {
    throw error;
  }
}
