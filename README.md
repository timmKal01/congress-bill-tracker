# Congress Bill Tracker

Track new and recently introduced U.S. federal bills by keyword,
status, or Congress number, via the public [GovTrack.us
API](https://www.govtrack.us/api/v2/bill): bill number, title,
sponsor, chamber, and current legislative status.

Built for policy, government-affairs, and lobbying teams who need to
catch new bills touching a topic without checking congress.gov by
hand.

## Input

```json
{
  "keyword": "climate",
  "currentStatus": "",
  "congress": null,
  "daysBack": 7,
  "maxResults": 25
}
```

| Field | Type | Description |
|---|---|---|
| `keyword` | string (optional) | Free-text search against bill titles, e.g. `"climate"` or `"broadband"`. Leave blank for all recently introduced bills. |
| `currentStatus` | string (optional) | Filter to one exact legislative status, e.g. `"introduced"`, `"reported"`, `"passed_bill"`, `"enacted_signed"`, `"vetoed_pocket"`. See the input schema description for the full valid list — GovTrack rejects unrecognized values with a clear error. |
| `congress` | number (optional) | Limit to one numbered Congress, e.g. `119` for the current 2025-2027 Congress. |
| `daysBack` | number | Only return bills introduced within this many days. Default `7`, max `365`. |
| `maxResults` | number | Max bills to return. Default `25`, max `100`. |

## Output

One record per matching bill:

```json
{
  "billNumber": "H.R. 10095",
  "title": "To amend the Foreign Service Act of 1980 to provide per diem eligibility for required leave of members of the Foreign Service.",
  "congress": 119,
  "chamber": "house",
  "status": "Introduced",
  "statusDate": "2026-08-13",
  "introducedDate": "2026-08-13",
  "isAlive": true,
  "sponsorName": "Rep. William R. Keating [D-MA9]",
  "sponsorParty": "Democrat",
  "sponsorState": "MA",
  "link": "https://www.govtrack.us/congress/bills/119/hr10095"
}
```

## How it works

Direct calls to the public [GovTrack.us API](https://www.govtrack.us/developers/api)
— no proxy, no key, no scraping. GovTrack aggregates official
congress.gov/THOMAS legislative data into a clean public API.

## Pricing note

Billed per **search**, not per bill returned — one charge whether the
search returns 0 bills or 100.

## Related products

- [Federal Register Tracker](https://github.com/timmKal01/federal-register-tracker) — the agency-rulemaking counterpart (not legislation)
