"use client"

import { useState } from 'react'
import { updateProfile } from './actions'
import { Save } from 'lucide-react'

interface Profile {
    full_name?: string;
    username?: string;
    avatar_url?: string;
}

interface EditProfileFormProps {
    profile: Profile | null;
    onCancel: () => void;
}

export default function EditProfileForm({ profile, onCancel }: EditProfileFormProps) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        setError(null)

        try {
            // Check if we need to call updateProfile manually or if form action handles it
            // Here we seem to be mixing concepts. If updateProfile is a server action,
            // we can call it directly.
            const result = await updateProfile(formData) as { error?: string }
            if (result?.error) {
                setError(result.error)
            } else {
                onCancel()
            }
        } catch {
            setError("Failed to update profile")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative">
            <h2 className="text-xl font-bold mb-6">Edit Profile</h2>

            {error && <div className="text-red-400 text-sm mb-4">{error}</div>}

            <form action={handleSubmit} className="space-y-4">
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

                <div className="flex justify-end gap-3 mt-8">
                    <button type="button" onClick={onCancel} className="px-4 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors">
                        Cancel
                    </button>
                    <button type="submit" disabled={loading} className="px-6 py-2 bg-matcha text-white rounded-lg font-medium hover:bg-white hover:text-matcha transition-colors disabled:opacity-50 flex items-center gap-2">
                        {loading ? 'Saving...' : <><Save size={16} /> Save Changes</>}
                    </button>
                </div>
            </form>
        </div>
    )
}
