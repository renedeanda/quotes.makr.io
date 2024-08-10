import os

def update_file(path, content):
    with open(path, 'w') as f:
        f.write(content)
    print(f"Updated file: {path}")

def fix_background():
    # Update global styles to ensure background gradient is visible
    globals_css_content = '''
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 255, 255, 255;
}

html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(to top, #ff6e7f, #bfe9ff);
  background-attachment: fixed;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

#__next {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.quote-container {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Rest of your custom styles */
'''
    update_file('src/styles/globals.css', globals_css_content)

    # Update layout component to ensure proper structure
    layout_content = '''
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Inspirational Quotes',
  description: 'Daily inspiration and motivational quotes',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-t from-[#ff6e7f] to-[#bfe9ff]">
          {children}
        </div>
      </body>
    </html>
  )
}
'''
    update_file('src/app/layout.js', layout_content)

    print("Website background gradient fixed successfully!")

if __name__ == "__main__":
    fix_background()
