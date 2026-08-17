const BASE_URL = 'https://www.govtrack.us/api/v2/bill';

export async function fetchBills({ keyword, currentStatus, congress, daysBack, maxResults }) {
    const cutoff = new Date(Date.now() - daysBack * 24 * 60 * 60 * 1000);
    const cutoffStr = cutoff.toISOString().slice(0, 10);

    const url = new URL(BASE_URL);
    url.searchParams.set('introduced_date__gte', cutoffStr);
    url.searchParams.set('sort', '-introduced_date');
    url.searchParams.set('limit', String(Math.min(maxResults, 100)));
    if (keyword) url.searchParams.set('q', keyword);
    if (currentStatus) url.searchParams.set('current_status', currentStatus);
    if (congress) url.searchParams.set('congress', String(congress));

    const res = await fetch(url, { headers: { Connection: 'close' } });
    if (!res.ok) {
        const body = await res.text();
        throw new Error(`GovTrack API request failed: ${res.status} ${res.statusText} — ${body.slice(0, 300)}`);
    }
    const data = await res.json();

    return (data.objects ?? []).map((bill) => ({
        billNumber: bill.display_number,
        title: bill.title_without_number,
        congress: bill.congress,
        chamber: bill.current_chamber,
        status: bill.current_status_label,
        statusDate: bill.current_status_date,
        introducedDate: bill.introduced_date,
        isAlive: bill.is_alive,
        sponsorName: bill.sponsor?.name ?? null,
        sponsorParty: bill.sponsor_role?.party ?? null,
        sponsorState: bill.sponsor_role?.state ?? null,
        link: bill.link,
    }));
}
