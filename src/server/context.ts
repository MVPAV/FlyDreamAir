import {getServerSession} from 'next-auth';
import {authOptions} from 'src/server/auth';
import type {FetchCreateContextFnOptions} from "@trpc/server/adapters/fetch";
import type { Session } from "next-auth";

export type Context = {
    session: Session | null;
};

export async function createTRPCContext(_opts: FetchCreateContextFnOptions): Promise<Context> {
    const session = await getServerSession(authOptions);
    return {
        session,
    };
}
