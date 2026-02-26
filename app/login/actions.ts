'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { isValidEmail, isValidPassword, isValidUsername } from '@/utils/validation'

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
        // Validate username format before query
        if (!isValidUsername(identifier)) {
            return { error: 'Invalid username format.' }
        }
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
    } else {
        // Validate email format
        if (!isValidEmail(identifier)) {
            return { error: 'Invalid email format.' }
        }
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

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const fullName = formData.get('fullName') as string
    const username = formData.get('username') as string

    if (!isValidEmail(email)) {
        return { error: 'Invalid email format.' }
    }

    if (!isValidPassword(password)) {
        return { error: 'Password must be at least 6 characters.' }
    }

    if (!isValidUsername(username)) {
        return { error: 'Username must be alphanumeric and 3-20 characters long.' }
    }

    const data = {
        email,
        password,
        options: {
            data: {
                full_name: fullName,
                username,
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
