'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { UserPlusIcon } from '@heroicons/react/24/solid'

export default function RegisterPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [mounted, setMounted] = useState(false)
    const router = useRouter()

    useEffect(() => {
        setMounted(true)
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        try {
            const response = await fetch('http://localhost:8080/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })

            if (response.ok) {
                router.push('/login')
            } else {
                const data = await response.json()
                console.log(data.error)
                setError(data.error)
            }
        } catch (err) {
            setError('An error occurred. Please try again.')
        }
    }

    if (!mounted) {
        return null
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] dark:bg-gray-900 relative overflow-hidden">
            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}
            />

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-green-100 dark:bg-green-900/20 rounded-full blur-3xl transform translate-x-20 -translate-y-20 opacity-50" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-green-50 dark:bg-green-900/10 rounded-full blur-3xl transform -translate-x-20 translate-y-20 opacity-50" />

            <AnimatePresence>
                {mounted && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl w-96 relative backdrop-blur-sm bg-opacity-95 dark:bg-opacity-90 border border-gray-200 dark:border-gray-700"
                    >
                        <div className="flex justify-center mb-8">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="bg-green-600 dark:bg-green-500 p-3 rounded-full shadow-lg"
                            >
                                <UserPlusIcon className="h-6 w-6 text-white" />
                            </motion.div>
                        </div>
                        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-100">Registro</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="password" className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">
                                    Contraseña
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            {error && <p className="text-red-500 dark:text-red-400 text-sm mb-4">{error}</p>}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-green-600 dark:bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700 dark:hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 shadow-sm transition-colors duration-200"
                                type="submit"
                            >
                                Registrar
                            </motion.button>
                        </form>
                        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
                            Ya tienes una cuenta?{' '}
                            <Link href="/login" className="text-green-600 dark:text-green-400 hover:underline font-medium">
                                Inicia Sesión
                            </Link>
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}