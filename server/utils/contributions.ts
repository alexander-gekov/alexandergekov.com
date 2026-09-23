export type ContributionDay = { date: string, count: number, level: number }

const attr = (tag: string, name: string) => tag.match(new RegExp(`${name}="([^"]*)"`))?.[1] ?? ''

// ponytail: scrapes github.com/users/<user>/contributions markup; if GitHub changes it,
// switch to the GraphQL contributionsCollection API (needs a token).
export function parseContributions(html: string): { total: number, days: ContributionDay[] } {
  const counts = new Map<string, number>()
  for (const [, id, text] of html.matchAll(/<tool-tip[^>]*for="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g))
    counts.set(id!, Number.parseInt(text!) || 0)

  const days = [...html.matchAll(/<td[^>]*ContributionCalendar-day[^>]*>/g)]
    .map(([td]) => ({ date: attr(td, 'data-date'), level: Number(attr(td, 'data-level')), count: counts.get(attr(td, 'id')) ?? 0 }))
    .filter(day => day.date)
    .sort((a, b) => a.date.localeCompare(b.date))

  return { total: days.reduce((sum, day) => sum + day.count, 0), days }
}
