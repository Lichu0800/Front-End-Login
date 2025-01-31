import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const { username, password } = await request.json()

    // Simulate authentication logic
    if (username === 'demo' && password === 'password') {
        return NextResponse.json({ message: 'Login successful' }, { status: 200 })
    } else {
        return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
    }
}

