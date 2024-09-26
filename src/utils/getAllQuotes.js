import fs from 'fs'
import path from 'path'

export default async function getAllQuotes() {
  const filePath = path.join(process.cwd(), 'public', 'quotes.json')
  const fileContents = await fs.promises.readFile(filePath, 'utf8')
  const data = JSON.parse(fileContents)
  
  // Extract the quotes array from the JSON structure
  return data.quotes || []
}