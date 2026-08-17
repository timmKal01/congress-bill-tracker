import { Actor, log } from 'apify';
import { fetchBills } from './govtrack.js';

await Actor.init();

const input = (await Actor.getInput()) ?? {};
const { keyword, currentStatus, congress, daysBack = 7, maxResults = 25 } = input;

/** Must match the event name configured in this Actor's pay-per-event pricing on Apify. */
const BILL_SEARCH_EVENT = 'bill-search';

const bills = await fetchBills({
    keyword,
    currentStatus,
    congress,
    daysBack: Math.min(daysBack, 365),
    maxResults: Math.min(maxResults, 100),
});

for (const bill of bills) {
    await Actor.pushData(bill);
}

await Actor.charge({ eventName: BILL_SEARCH_EVENT });

log.info(`Pushed ${bills.length} bill(s)`);

await Actor.exit();
