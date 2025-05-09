import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
    const { email, password } = await req.json();

    if (!email || !password) {
        return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // TODO: Lưu hashedPassword vào database
    console.log(`Signup: ${email}, hashedPassword: ${hashedPassword}`);

    return NextResponse.json({ message: 'Signup successful' });
}
