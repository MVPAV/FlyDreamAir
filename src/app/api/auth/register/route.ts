import {NextResponse} from "next/server";
import {saltAndHashPassword} from 'src/utils/auth';
import {createUser} from "src/db/users";

export async function POST(request: Request) {
    try {
        const {email, password} = await request.json();
        const hashedPassword = await saltAndHashPassword(password);

        const response = await createUser({
            email,
            password: hashedPassword
        });
    } catch (e) {
        console.log({e});
    }

    return NextResponse.json({message: "success"});
}
