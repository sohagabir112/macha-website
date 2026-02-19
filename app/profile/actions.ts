"use server"

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateProfile(formData: FormData) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: "Not authenticated" }

    const fullName = formData.get('fullName') as string
    const username = formData.get('username') as string
    const avatarUrl = formData.get('avatarUrl') as string

    if (!fullName || !username) {
        return { error: 'Name and Username are required' }
    }

    const updates = {
        full_name: fullName,
        username: username,
        avatar_url: avatarUrl || null,
        updated_at: new Date().toISOString(),
    }

    const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/profile')
    return { success: true }
}
