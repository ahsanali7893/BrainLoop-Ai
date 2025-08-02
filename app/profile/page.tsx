"use client"
import Header from '@/components/header'
import ProtectedRoute from '@/components/protected-route'
import { useAuth } from '@/contexts/auth-context'
import { useState } from 'react'

export default function ProfilePage() {
  const { user } = useAuth();
  const [email, setEmail] = useState(user?.email || "");
  // Add more profile fields as needed

  return (
    <ProtectedRoute>
      <div className="flex h-screen flex-col bg-background">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Profile Settings</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-800"
                value={email}
                disabled
              />
            </div>
            {/* Add more profile fields and update logic here */}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
