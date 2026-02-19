"use client"

import { useState } from 'react'
import { updateCartItem, removeCartItem, checkout } from './actions'
import { Trash2, Plus, Minus, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function CartClient({ initialItems }: { initialItems: any[] }) {
    const [items, setItems] = useState(initialItems)
    const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({})
    const [isCheckingOut, setIsCheckingOut] = useState(false)
    const router = useRouter()

    const handleUpdateQuantity = async (id: string, newQuantity: number) => {
        setLoadingMap(prev => ({ ...prev, [id]: true }))
        try {
            if (newQuantity < 1) {
                await removeCartItem(id)
                setItems(prev => prev.filter(item => item.id !== id))
            } else {
                await updateCartItem(id, newQuantity)
                setItems(prev => prev.map(item => item.id === id ? { ...item, quantity: newQuantity } : item))
            }
        } catch (error) {
            console.error("Failed to update item", error)
        } finally {
            setLoadingMap(prev => ({ ...prev, [id]: false }))
        }
    }

    const handleRemove = async (id: string) => {
        if (!confirm('Are you sure you want to remove this item?')) return

        setLoadingMap(prev => ({ ...prev, [id]: true }))
        try {
            await removeCartItem(id)
            setItems(prev => prev.filter(item => item.id !== id))
        } catch (error) {
            console.error("Failed to remove item", error)
        } finally {
            setLoadingMap(prev => ({ ...prev, [id]: false }))
        }
    }

    // We bind this to the layout or handle it globally, but for now purely client side state update 
    // real-time syncing might be better with optimistic UI

    return (
        <div className="space-y-4">
            {items.map((item) => (
                <div key={item.id} className="bg-white/5 border border-white/5 rounded-xl p-4 flex gap-4 hover:border-white/10 transition-colors group">
                    {/* Placeholder Image Logic - mapping names to images roughly or use generic */}
                    <div className="w-24 h-24 bg-white/5 rounded-lg flex-shrink-0 flex items-center justify-center p-2">
                        {/* We try to use the product name to find the image, or fallback */}
                        <div className="text-xs text-white/20 text-center">{item.product_name}</div>
                    </div>

                    <div className="flex-grow flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="font-medium text-lg text-white">{item.product_name}</h4>
                                <p className="text-sm text-white/50">Ceremonial Grade</p>
                            </div>
                            <p className="font-mono text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-3 bg-black/20 rounded-full px-1 py-1 border border-white/5">
                                <button
                                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                    disabled={loadingMap[item.id]}
                                    className="p-1 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors disabled:opacity-50"
                                >
                                    <Minus size={14} />
                                </button>
                                <span className="font-mono text-sm w-4 text-center">{item.quantity}</span>
                                <button
                                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                    disabled={loadingMap[item.id]}
                                    className="p-1 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors disabled:opacity-50"
                                >
                                    <Plus size={14} />
                                </button>
                            </div>

                            <button
                                onClick={() => handleRemove(item.id)}
                                disabled={loadingMap[item.id]}
                                className="text-xs text-red-400 hover:text-red-300 transition-colors flex items-center gap-1 opacity-60 hover:opacity-100"
                            >
                                <Trash2 size={14} />
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
