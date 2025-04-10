"use client"
// app/privacy/page.js
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="bg-gray-900 text-white flex flex-col min-h-screen">
      {/* Cabeçalho */}
      <header className="bg-gray-800 glass py-4 top">
        <div className="container mx-auto text-center ">
          <h1 className="text-3xl font-bold">
            <Link href="/" className="text-blue-500 hover:underline">
              😎
            </Link>
          </h1>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="bg-gray-800 glass p-10 rounded-2xl shadow-2xl w-full max-w-3xl top">
          <h2 className="text-3xl font-extrabold text-center mb-6">
            How We Use Your Data
          </h2>
          <div className="space-y-4 text-gray-300 text-lg">
            <p>
              We value your privacy and security. All images and data you upload
              to our service are processed securely and are never stored permanently on our servers.
            </p>
            <p>
              Once your image is processed and converted, the original file is deleted immediately
              from our system. This ensures that your personal data remains confidential and is only used to enhance your experience.
            </p>
            <p>
              We do not share, sell, or use your data for any other purposes. For more detailed information,
              please contact{' '}
              <a
                href="https://discord.com/users/852948371782369310"
                className="underline hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                menezes
              </a>{' '}
              with any questions regarding data protection.
            </p>
          </div>
        </div>
      </main>

      {/* Rodapé */}
      <footer className="bg-gray-800 glass p-4 text-center top">
        <p className="text-sm text-gray-400">
          &copy; 2025 OMG Black Guy Generator by{' '}
          <a
            href="https://github.com/Sintzy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            menezes
          </a>
          . All rights reserved. Check{' '}
          <Link href="/privacy" className="underline hover:underline">
            how do we use your data
          </Link>
        </p>
      </footer>


      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
        div {
          font-family: 'Outfit', sans-serif;
        }
        .glass {
            background: rgba(255, 255, 255, 0.01);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .dark .glass {
            background: rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .top {
        background: rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
}
