# 🚀 PoultryMitra: Complete Deployment Guide
## Supabase + Next.js + Vercel

---

## 📋 TABLE OF CONTENTS
1. [Prerequisites](#prerequisites)
2. [Step 1: Supabase Setup](#step-1-supabase-setup)
3. [Step 2: Local Development](#step-2-local-development)
4. [Step 3: Database Schema](#step-3-database-schema)
5. [Step 4: Environment Variables](#step-4-environment-variables)
6. [Step 5: Vercel Deployment](#step-5-vercel-deployment)
7. [Complete Code Files](#complete-code-files)
8 [Troubleshooting](#troubleshooting)

---

## Prerequisites

✅ Node.js 16+ installed  
✅ npm or yarn package manager  
✅ GitHub account  
✅ Supabase account (free)  
✅ Vercel account (free)  

```bash
# Verify installations
node --version
npm --version
git --version
```

---

## Step 1: Supabase Setup

### 1.1 Create Supabase Project

1. Go to https://supabase.com
2. Click "Start your project" 
3. Sign up or login with GitHub
4. Click "New project"
5. Fill in:
   - **Project name**: `poultrymitra-prod`
   - **Password**: Create strong password
   - **Region**: Select closest to you (India = Singapore)
6. Click "Create new project" (wait 2-3 min)

### 1.2 Get Your API Keys

1. In Supabase dashboard: Settings → API
2. Copy these values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **Anon Key**: `eyJ...` (public key)
   - **Service Role Key**: Keep SECRET

💾 **Save these in a secure file!**

---

## Step 2: Local Development

### 2.1 Clone & Setup

```bash
# Clone repository
git clone https://github.com/DKUMARGUPTA/ipoultrymitra.git
cd ipoultrymitra

# Install dependencies
npm install
# or
yarn install
```

### 2.2 Create .env.local

Create file `.env.local` in root directory:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# App
NEXT_PUBLIC_APP_NAME=PoultryMitra
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 2.3 Run Locally

```bash
npm run dev

# Open browser
# http://localhost:3000
```

---

## Step 3: Database Schema

### 3.1 Create Tables in Supabase

Go to Supabase Dashboard → SQL Editor → New Query

#### Users Table

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR UNIQUE NOT NULL,
  full_name VARCHAR,
  user_type VARCHAR CHECK (user_type IN ('farmer', 'dealer', 'integrator', 'owner')),
  phone VARCHAR,
  location VARCHAR,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
```

#### Farms Table

```sql
CREATE TABLE farms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  farm_name VARCHAR NOT NULL,
  location VARCHAR,
  total_birds INT,
  farm_type VARCHAR,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
```

#### Daily Records Table

```sql
CREATE TABLE daily_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  farm_id UUID NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  feed_given DECIMAL,
  mortality INT,
  eggs_produced INT,
  weight_gained DECIMAL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
```

#### Inventory Table

```sql
CREATE TABLE inventory (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id),
  item_name VARCHAR NOT NULL,
  quantity INT,
  unit_price DECIMAL,
  supplier VARCHAR,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
```

### 3.2 Create Auth with Supabase

Go to Supabase Dashboard → Authentication → Enable Email Auth

---

## Step 4: Environment Variables

### File: `.env.local`

```env
# === SUPABASE ===
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# === APPLICATION ===
NEXT_PUBLIC_APP_NAME=PoultryMitra
NEXT_PUBLIC_APP_VERSION=11.0.0
NEXT_PUBLIC_APP_URL=http://localhost:3000

# === FEATURES ===
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_NOTIFICATIONS=true
```

### File: `.env.example` (For GitHub)

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_APP_NAME=
NEXT_PUBLIC_APP_URL=
```

---

## Step 5: Vercel Deployment

### 5.1 Push to GitHub

```bash
# Stage changes
git add .

# Commit
git commit -m "feat: Add complete app code with Supabase integration"

# Push
git push origin main
```

### 5.2 Deploy on Vercel

1. Go to https://vercel.com
2. Click "New Project"
3. Import from GitHub → Select `ipoultrymitra`
4. Click "Import"
5. Under "Environment Variables", add:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Anon Key
   - `SUPABASE_SERVICE_ROLE_KEY`: Your Service Role Key
6. Click "Deploy"
7. Wait for deployment (2-3 minutes)
8. Visit your live URL!

---

## Complete Code Files

### Core Files to Create

#### `src/lib/supabase.ts`
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

#### `src/pages/index.tsx`
```typescript
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-green-600">🐔 PoultryMitra</h1>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 py-8">
        {user ? (
          <div>
            <h2>Welcome, {user.email}!</h2>
            <button onClick={() => supabase.auth.signOut()}>
              Logout
            </button>
          </div>
        ) : (
          <div>
            <h2>Please login</h2>
            <button onClick={() => supabase.auth.signInWithOAuth({ provider: 'github' })}>
              Login with GitHub
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
```

#### `next.config.js`
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
}

module.exports = nextConfig
```

#### `tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "jsx": "preserve",
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "allowJs": true,
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

---

## 🐛 Troubleshooting

### "Cannot find module '@supabase/supabase-js'"
```bash
npm install @supabase/supabase-js
```

### "Environment variables not loading"
- Make sure you created `.env.local` (not `.env`)
- Restart dev server: `npm run dev`
- For Vercel: Go to Project Settings → Environment Variables

### "Supabase API Key errors"
- Check URL format: Must be `https://xxxx.supabase.co`
- Make sure Anon Key is not truncated
- Verify keys in Supabase Dashboard

### "Deployment stuck at 'building'"
- Check build logs in Vercel
- Ensure all environment variables are set
- Try rebuilding from Vercel dashboard

---

## 📞 Support

For issues:
1. Check GitHub issues: https://github.com/DKUMARGUPTA/ipoultrymitra/issues
2. Email: araj.dkg@gmail.com
3. Supabase Docs: https://supabase.com/docs
4. Vercel Docs: https://vercel.com/docs

---

**🎉 Congratulations! Your PoultryMitra app is now live!**
