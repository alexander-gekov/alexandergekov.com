export default defineEventHandler(async (event) => {
  try {
    const response = await $fetch<string>('https://dev.to/feed/alexandergekov', {
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
    })

    const items = response.match(/<item>[\s\S]*?<\/item>/g) || []
    
    const posts = items.slice(0, 10).map((item) => {
      const titleMatch = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/)
      const title = titleMatch ? (titleMatch[1] || titleMatch[2] || '').trim() : ''
      
      const linkMatch = item.match(/<link>(.*?)<\/link>/)
      const link = linkMatch ? linkMatch[1].trim() : ''
      
      const pubDateMatch = item.match(/<pubDate>(.*?)<\/pubDate>/)
      const pubDate = pubDateMatch ? pubDateMatch[1].trim() : ''
      
      const date = pubDate ? new Date(pubDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }) : ''

      return {
        title,
        href: link,
        date,
      }
    }).filter(post => post.title && post.href)

    return posts
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
})

