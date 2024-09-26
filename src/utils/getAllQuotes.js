import fs from 'fs'
import path from 'path'

export default async function getAllQuotes() {
  const filePath = path.join(process.cwd(), 'public', 'quotes.json')
  const fileContents = await fs.promises.readFile(filePath, 'utf8')
  const quotes = JSON.parse(fileContents)
  return quotes
}