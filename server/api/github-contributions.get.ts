export default defineCachedEventHandler(async () => {
  const html = await $fetch<string>('https://github.com/users/alexander-gekov/contributions', {
    headers: { 'User-Agent': 'Mozilla/5.0' },
  })
  const result = parseContributions(html)
  if (!result.days.length) throw createError({ statusCode: 502, statusMessage: 'Could not parse GitHub contributions' })
  return result
}, { maxAge: 60 * 60 })
