import { useEffect, useState } from 'react'
import { supabase, getCurrentUser } from '@/lib/supabase'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [farms, setFarms] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCurrentUser().then((u) => {
      setUser(u)
      if (u) loadFarms(u.id)
    })
  }, [])

  const loadFarms = async (userId: string) => {
    try {
      const { data } = await supabase.from('farms').select('*').eq('user_id', userId)
      setFarms(data || [])
    } finally {
      setLoading(false)
    }
  }

  if (!user) return <div>Please login first</div>

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-xl font-bold mb-4">Welcome, {user.email}</h2>
        
        {loading ? (
          <div>Loading farms...</div>
        ) : (
          <div>
            <h3 className="text-lg font-semibold mb-4">Your Farms ({farms.length})</h3>
            {farms.length === 0 ? (
              <p>No farms yet. Create your first farm!</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {farms.map((farm: any) => (
                  <div key={farm.id} className="bg-white p-6 rounded-lg shadow">
                    <h4 className="text-lg font-bold">{farm.farm_name}</h4>
                    <p className="text-gray-600">{farm.location}</p>
                    <p className="text-gray-600">Birds: {farm.total_birds}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
