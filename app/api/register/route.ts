import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const { username, email, password } = await request.json()

    // Simulate registration logic
    if (username && email && password) {
        // In a real application, you would hash the password and store the user in a database
        return NextResponse.json({ message: 'Registration successful' }, { status: 200 })
    } else {
        return NextResponse.json({ message: 'Invalid registration data' }, { status: 400 })
    }
}

