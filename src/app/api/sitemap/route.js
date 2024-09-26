import getAllQuotes from '@/utils/getAllQuotes'

const generateSitemap = (quotes) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://quotes.makr.io</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      ${quotes.map((quote) => `
        <url>
          <loc>https://quotes.makr.io/${quote.author.replace(/\s+/g, '-').toLowerCase()}/${quote.quote.slice(0, 50).replace(/\s+/g, '-').toLowerCase()}</loc>
          <changefreq>monthly</changefreq>
          <priority>0.8</priority>
        </url>
      `).join('')}
    </urlset>
  `
}

export async function GET() {
  try {
    const quotes = await getAllQuotes()
    const sitemap = generateSitemap(quotes)

    return new Response(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'text/xml',
      },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error generating sitemap' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}