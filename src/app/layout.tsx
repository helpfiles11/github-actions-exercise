import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'GitHub Actions Exercise - Part 2',
  description: 'Next.js application deployed via GitHub Actions with CloudFront',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
          <nav className="bg-white bg-opacity-10 backdrop-blur-md shadow-lg">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold text-white">
                GitHub Actions Exercise
              </h1>
              <div className="flex gap-4">
                <a href="/" className="text-white hover:text-gray-100">
                  Home
                </a>
                <a href="/about" className="text-white hover:text-gray-100">
                  About
                </a>
              </div>
            </div>
          </nav>
          <main className="max-w-7xl mx-auto px-4 py-12">
            {children}
          </main>
          <footer className="bg-black bg-opacity-30 backdrop-blur-md text-white text-center py-6 mt-12">
            <p>Deployed via GitHub Actions • Built with Next.js • Served by CloudFront</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
