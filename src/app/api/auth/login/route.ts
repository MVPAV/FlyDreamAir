import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'dev_secret_key';

export async function POST(req: Request) {
    const { email, password } = await req.json();

    // TODO: Lấy user từ database
    const fakeUser = {
        email: 'test@example.com',
        passwordHash: await bcrypt.hash('123456', 10),
    };

    const passwordMatch = await bcrypt.compare(password, fakeUser.passwordHash);

    if (!passwordMatch || email !== fakeUser.email) {
        return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });

    return NextResponse.json({ message: 'Login successful', token });
}
