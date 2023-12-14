import { ClerkProvider } from '@clerk/nextjs'
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider >
      <html lang="en">
        <body className='px-4 pt-6 pb-10'>{children}</body>
      </html>
    </ClerkProvider>
  )
}
