import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase, getCurrentUser } from '@/lib/supabase'

export default function Home() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    getCurrentUser().then(setUser)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-green-600">🐔 PoultryMitra</h1>
          {user && (
            <button onClick={() => supabase.auth.signOut()} className="px-4 py-2 bg-red-500 text-white rounded">
              Logout
            </button>
          )}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-4xl font-bold mb-4">Welcome to PoultryMitra</h2>
        <p className="text-xl text-gray-600 mb-8">Your Complete Poultry Management Solution</p>

        {user ? (
          <Link href="/dashboard" className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg">
            Go to Dashboard
          </Link>
        ) : (
          <Link href="/login" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg">
            Login with GitHub
          </Link>
        )}
      </main>
    </div>
  )
}
