'use server'

import { signIn, signOut } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import bcrypt from 'bcryptjs'
import connectDB from '@/lib/mongodb'
import User from '@/lib/models/User'
import { AuthError } from 'next-auth'
import { isRedirectError } from 'next/dist/client/components/redirect-error'

export async function login(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
        // In NextAuth v5, signIn in a server action uses redirectTo (not redirect: false)
        // It throws a NEXT_REDIRECT internally on success — we must re-throw it
        await signIn('credentials', {
            email,
            password,
            redirectTo: '/',
        })
    } catch (error) {
        // Always re-throw Next.js redirect errors — they are how navigation works
        if (isRedirectError(error)) throw error

        if (error instanceof AuthError) {
            return redirect('/auth/login?message=Invalid email or password')
        }

        console.error('Login error:', error)
        return redirect('/auth/login?message=Something went wrong. Please try again.')
    }

    revalidatePath('/', 'layout')
}

export async function signup(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password) {
        return redirect('/auth/login?message=Email and password are required')
    }

    if (password.length < 6) {
        return redirect('/auth/login?message=Password must be at least 6 characters')
    }

    try {
        await connectDB()

        const existing = await User.findOne({ email })
        if (existing) {
            return redirect('/auth/login?message=An account with this email already exists')
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        await User.create({ email, password: hashedPassword })
    } catch (error) {
        if (isRedirectError(error)) throw error
        console.error('Signup DB error:', error)
        return redirect('/auth/login?message=Could not create account. Check your connection.')
    }

    // Auto sign in after signup
    try {
        await signIn('credentials', {
            email,
            password,
            redirectTo: '/',
        })
    } catch (error) {
        if (isRedirectError(error)) throw error
        return redirect('/auth/login?message=Account created! Please log in.')
    }

    revalidatePath('/', 'layout')
}

export async function logout() {
    await signOut({ redirectTo: '/auth/login' })
}