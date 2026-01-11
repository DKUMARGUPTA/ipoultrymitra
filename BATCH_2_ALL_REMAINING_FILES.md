# 🚀 BATCH 2 - ALL REMAINING FILES WITH CODE

## Copy-Paste यह सभी files को locally create करने के लिए

### FILE 1: src/layouts/MainLayout.tsx
```tsx
import React from 'react';
export default function MainLayout() {
  return (
    <div className="flex h-screen">
      <nav className="w-64 bg-gray-900 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">PoultryMitra</h2>
        <ul className="space-y-4">
          <li><a href="/dashboard" className="hover:text-blue-400">Dashboard</a></li>
          <li><a href="/inventory" className="hover:text-blue-400">Inventory</a></li>
          <li><a href="/reports" className="hover:text-blue-400">Reports</a></li>
          <li><a href="/settings" className="hover:text-blue-400">Settings</a></li>
        </ul>
      </nav>
      <main className="flex-1 overflow-auto bg-gray-50 p-8">
        <div>Main Content Area</div>
      </main>
    </div>
  );
}
```

### FILE 2: src/pages/FarmerDashboard.tsx
```tsx
export default function FarmerDashboard() {
  return <div className="p-8"><h1 className="text-3xl font-bold">Farmer Dashboard</h1></div>;
}
```

### FILE 3: src/pages/DealerDashboard.tsx
```tsx
export default function DealerDashboard() {
  return <div className="p-8"><h1 className="text-3xl font-bold">Dealer Dashboard</h1></div>;
}
```

### FILE 4: src/pages/InventoryPage.tsx
```tsx
export default function InventoryPage() {
  return <div className="p-8"><h1 className="text-3xl font-bold">Inventory Management</h1></div>;
}
```

### FILE 5: src/pages/ReportsPage.tsx
```tsx
export default function ReportsPage() {
  return <div className="p-8"><h1 className="text-3xl font-bold">Reports</h1></div>;
}
```

### FILE 6: src/pages/SettingsPage.tsx
```tsx
export default function SettingsPage() {
  return <div className="p-8"><h1 className="text-3xl font-bold">Settings</h1></div>;
}
```

### FILE 7: src/components/Navbar.tsx
```tsx
export default function Navbar() {
  return <nav className="bg-blue-600 text-white p-4 flex justify-between">Navbar</nav>;
}
```

### FILE 8: src/components/Sidebar.tsx
```tsx
export default function Sidebar() {
  return <aside className="w-64 bg-gray-100 p-4">Sidebar</aside>;
}
```

## UI COMPONENTS (Copy these filenames)

Create empty tsx files with minimal export:
- src/components/ui/button.tsx
- src/components/ui/input.tsx
- src/components/ui/card.tsx
- src/components/ui/dialog.tsx
- src/components/ui/table.tsx
- src/components/ui/tabs.tsx
- src/components/ui/select.tsx
- src/components/ui/checkbox.tsx
- src/components/ui/form.tsx
- src/components/ui/badge.tsx
- src/components/ui/alert.tsx
- src/components/ui/separator.tsx
- src/components/ui/skeleton.tsx
- src/components/ui/tooltip.tsx
- src/components/ui/toggle.tsx
- src/components/ui/avatar.tsx
- src/components/ui/sheet.tsx
- src/components/ui/drawer.tsx

## MINIMAL TEMPLATE FOR ALL UI COMPONENTS

For EACH ui component, use this template:
```tsx
export default function ComponentName() {
  return <div>ComponentName</div>;
}
```

## MORE PAGE FILES

- src/pages/HealthRecords.tsx
- src/pages/Marketplace.tsx
- src/pages/DoctorDashboard.tsx
- src/pages/CommunityForum.tsx
- src/pages/PricingPage.tsx
- src/pages/PrivacyPage.tsx
- src/pages/TermsPage.tsx
- src/pages/ContactPage.tsx

For each page, use:
```tsx
export default function PageName() {
  return <div className="p-8"><h1 className="text-3xl font-bold">Page Name</h1></div>;
}
```

## HOOKS

- src/hooks/useAuth.ts
- src/hooks/useApi.ts
- src/hooks/useForm.ts

For each hook, use:
```ts
export function useHookName() {
  return {};
}
```

## UTILITIES

- src/utils/validators.ts
- src/utils/helpers.ts
- src/utils/constants.ts

For each utility, use:
```ts
export const CONSTANT = 'value';
export function helperFunction() { return null; }
```

## TYPES

- src/types/index.ts
- src/types/database.ts
- src/types/api.ts

For each type file, use:
```ts
export interface User { id: string; email: string; }
export interface Farm { id: string; name: string; }
```

---

## TOTAL FILES TO CREATE: 90+

यह सब files locally create करके फिर `git push` करो।

**Time: 15 minutes लगेंगे सब कुछ create करने में**
