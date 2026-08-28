'use server'

import { signIn, signOut } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import bcrypt from 'bcryptjs'
import connectDB from '@/lib/mongodb'
import User from '@/lib/models/User'
import { AuthError } from 'next-auth'

export async function login(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
        await signIn('credentials', {
            email,
            password,
            redirect: false,
        })
    } catch (error) {
        if (error instanceof AuthError) {
            return redirect('/auth/login?message=Invalid email or password')
        }
        throw error
    }

    revalidatePath('/', 'layout')
    redirect('/')
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

    await connectDB()

    const existing = await User.findOne({ email })
    if (existing) {
        return redirect('/auth/login?message=An account with this email already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    await User.create({ email, password: hashedPassword })

    // Auto sign in after signup
    try {
        await signIn('credentials', {
            email,
            password,
            redirect: false,
        })
    } catch {
        return redirect('/auth/login?message=Account created! Please log in.')
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function logout() {
    await signOut({ redirectTo: '/auth/login' })
}