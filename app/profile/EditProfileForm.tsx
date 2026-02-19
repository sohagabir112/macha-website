"use client"

import { useState } from 'react'
import { updateProfile } from './actions'
import { User, Save, X } from 'lucide-react'
import Image from 'next/image'

export default function EditProfileForm({ profile, onCancel }: { profile: any, onCancel: () => void }) {
    // We can use useFormState but simple state for now
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        setError(null)

        try {
            const result = await updateProfile(formData)
            if (result.error) {
                setError(result.error)
            } else {
                onCancel() // Close edit mode
            }
        } catch (e) {
            setError("Failed to update profile")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form action={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-6 relative">
            <h2 className="text-xl font-bold mb-6">Edit Profile</h2>

            {error && <div className="text-red-400 text-sm mb-4">{error}</div>}

            <div className="space-y-4">
                <div>
                    <label className="block text-sm text-white/60 mb-1">Full Name</label>
                    <input
                        name="fullName"
                        defaultValue={profile?.full_name}
                        className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-matcha"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm text-white/60 mb-1">Username</label>
                    <input
                        name="username"
                        defaultValue={profile?.username}
                        className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-matcha"
                        required
                    />
                </div>

                {/* Avatar URL is tricky without upload, simplified for now to text input or hidden if not used often */}
                {/* <div>
                    <label className="block text-sm text-white/60 mb-1">Avatar URL</label>
                    <input 
                        name="avatarUrl" 
                        defaultValue={profile?.avatar_url} 
                        className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-matcha"
                    />
                </div> */}
            </div>

            <div className="flex justify-end gap-3 mt-8">
                <button type="button" onClick={onCancel} className="px-4 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors">
                    Cancel
                </button>
                <button type="submit" disabled={loading} className="px-6 py-2 bg-matcha text-white rounded-lg font-medium hover:bg-white hover:text-matcha transition-colors disabled:opacity-50 flex items-center gap-2">
                    {loading ? 'Saving...' : <><Save size={16} /> Save Changes</>}
                </button>
            </div>
        </form>
    )
}
