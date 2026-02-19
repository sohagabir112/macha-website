'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
    const supabase = await createClient()

    const identifier = (formData.get('identifier') as string) || (formData.get('email') as string)
    const password = formData.get('password') as string

    if (!identifier || !password) {
        return { error: 'Email/Username and Password are required.' }
    }

    let email = identifier

    // If identifier is not an email, assume it's a username
    if (!identifier.includes('@')) {
        const { data, error } = await supabase
            .from('profiles')
            .select('email')
            .eq('username', identifier)
            .single()

        if (error || !data?.email) {
            // Return a generic error to avoid user enumeration, 
            // though effectively we are saying "User not found" here.
            return { error: 'Invalid login credentials.' }
        }
        email = data.email
    }

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function signup(formData: FormData) {
    const supabase = await createClient()

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        options: {
            data: {
                full_name: formData.get('fullName') as string,
                username: formData.get('username') as string,
            },
        },
    }

    const { error } = await supabase.auth.signUp(data)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/', 'layout')
    redirect('/')
}
