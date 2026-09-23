// Run: node --experimental-strip-types scripts/check-contributions.mjs
import assert from 'node:assert/strict'
import { parseContributions } from '../server/utils/contributions.ts'

const html = `
<td data-date="2026-01-02" id="day-1" data-level="2" class="ContributionCalendar-day"></td>
<td class="ContributionCalendar-day" data-level="0" id="day-0" data-date="2026-01-01"></td>
<td data-date="2026-01-03" id="day-2" data-level="1" class="ContributionCalendar-day"></td>
<tool-tip for="day-0" class="sr-only">No contributions on January 1st.</tool-tip>
<tool-tip for="day-1" class="sr-only">12 contributions on January 2nd.</tool-tip>
<tool-tip for="day-2" class="sr-only">1 contribution on January 3rd.</tool-tip>`

assert.deepEqual(parseContributions(html), {
  total: 13,
  days: [
    { date: '2026-01-01', level: 0, count: 0 },
    { date: '2026-01-02', level: 2, count: 12 },
    { date: '2026-01-03', level: 1, count: 1 },
  ],
})
console.log('contributions parser ok')
