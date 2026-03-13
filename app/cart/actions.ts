"use server"

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateCartItem(itemId: string, quantity: number) {
    const supabase = await createClient()

    // SECURITY: Validate authentication to prevent unauthorized modifications
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: "Please log in" }

    if (quantity < 1) {
        // If quantity is effectively 0, delete it
        // SECURITY: Scope query to authenticated user's ID to prevent IDOR
        const { error } = await supabase
            .from('cart_items')
            .delete()
            .eq('id', itemId)
            .eq('user_id', user.id)

        if (error) return { error: "Failed to remove item" } // SECURITY: Don't leak DB error details
    } else {
        // Update quantity
        // SECURITY: Scope query to authenticated user's ID to prevent IDOR
        const { error } = await supabase
            .from('cart_items')
            .update({ quantity })
            .eq('id', itemId)
            .eq('user_id', user.id)

        if (error) return { error: "Failed to update item" } // SECURITY: Don't leak DB error details
    }

    revalidatePath('/cart')
    revalidatePath('/profile')
    return { success: true }
}

export async function removeCartItem(itemId: string) {
    const supabase = await createClient()

    // SECURITY: Validate authentication to prevent unauthorized modifications
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: "Please log in" }

    // SECURITY: Scope query to authenticated user's ID to prevent IDOR
    const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId)
        .eq('user_id', user.id)

    if (error) return { error: "Failed to remove item" } // SECURITY: Don't leak DB error details

    revalidatePath('/cart')
    revalidatePath('/profile')
    return { success: true }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function checkout(formData?: FormData) {
    // This would integrate with Stripe or similar
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { error: "Please log in" }

    // 1. Get cart items
    const { data: cartItems } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user.id)

    if (!cartItems || cartItems.length === 0) return { error: "Cart is empty" }

    // 2. Calculate total
    const totalAmount = cartItems.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0)

    // 3. Create Order
    const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
            user_id: user.id,
            total_amount: totalAmount,
            status: 'Processing',
            items: JSON.stringify(cartItems)
        })
        .select()
        .single()

    if (orderError) return { error: orderError.message }

    // 4. Clear Cart
    await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id)

    revalidatePath('/cart')
    revalidatePath('/profile')
    return { success: true, orderId: order.id }
}
