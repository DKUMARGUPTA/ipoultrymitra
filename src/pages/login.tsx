import { useRouter } from 'next/router'
import { signInWithGitHub } from '@/lib/supabase'

export default function Login() {
  const router = useRouter()

  const handleGitHubLogin = async () => {
    const { error } = await signInWithGitHub()
    if (!error) {
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8 w-96">
        <h1 className="text-3xl font-bold text-center mb-2">PoultryMitra</h1>
        <p className="text-gray-600 text-center mb-8">Login to manage your farms</p>

        <button
          onClick={handleGitHubLogin}
          className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-800"
        >
          Login with GitHub
        </button>

        <p className="text-gray-600 text-center mt-6 text-sm">
          By logging in, you agree to our terms of service
        </p>
      </div>
    </div>
  )
}
