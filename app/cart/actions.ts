"use server"

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateCartItem(itemId: string, quantity: number) {
    const supabase = await createClient()

    if (quantity < 1) {
        // If quantity is effectively 0, delete it
        const { error } = await supabase
            .from('cart_items')
            .delete()
            .eq('id', itemId)

        if (error) return { error: error.message }
    } else {
        // Update quantity
        const { error } = await supabase
            .from('cart_items')
            .update({ quantity })
            .eq('id', itemId)

        if (error) return { error: error.message }
    }

    revalidatePath('/cart')
    revalidatePath('/profile')
    return { success: true }
}

export async function removeCartItem(itemId: string) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId)

    if (error) return { error: error.message }

    revalidatePath('/cart')
    revalidatePath('/profile')
    return { success: true }
}

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
