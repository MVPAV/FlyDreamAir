import {NextResponse} from "next/server";
import {saltAndHashPassword} from 'src/utils/auth';
import {createUser, getUserByEmail} from "src/server/db/users";

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        // Check if email already exists
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
        }

        const hashedPassword = await saltAndHashPassword(password);

        await createUser({
            email,
            password: hashedPassword,
        });

        return NextResponse.json({ message: 'success' });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

