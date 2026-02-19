"use client"

import { useState } from 'react'
import { User, Edit2 } from 'lucide-react'
import Image from 'next/image'
import EditProfileForm from './EditProfileForm'

export default function ProfileInfo({ profile, user, children }: { profile: any, user: any, children: React.ReactNode }) {
    const [isEditing, setIsEditing] = useState(false)

    if (isEditing) {
        return <EditProfileForm profile={profile} onCancel={() => setIsEditing(false)} />
    }

    return (
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center relative group">
            <button
                onClick={() => setIsEditing(true)}
                className="absolute top-4 right-4 p-2 text-white/20 hover:text-white hover:bg-white/10 rounded-full transition-all opacity-0 group-hover:opacity-100"
                title="Edit Profile"
            >
                <Edit2 size={16} />
            </button>

            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-matcha/80 to-matcha/20 p-1 mb-4 relative">
                <div className="w-full h-full rounded-full bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
                    {profile?.avatar_url ? (
                        <Image src={profile.avatar_url} alt="Profile" width={96} height={96} className="object-cover" />
                    ) : (
                        <User size={40} className="text-matcha" />
                    )}
                </div>
            </div>
            <h2 className="text-xl font-bold text-white mb-1">{profile?.full_name || 'Matcha Lover'}</h2>
            <p className="text-white/40 text-sm mb-6">@{profile?.username || user.email?.split('@')[0]}</p>

            {children}
        </div>
    )
}
