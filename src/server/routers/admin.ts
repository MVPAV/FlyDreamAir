import {router, publicProcedure} from '../trpc';
import {z} from 'zod';
import {deleteUser, getAllUsers} from "src/server/db/admin";

export const adminRouter = router({
    getAllUsers: publicProcedure.query(async () => {
        return await getAllUsers();
    }),

    deleteUser: publicProcedure
        .input(z.object({
            userId: z.string()
        }))
        .mutation(async ({input}) => {
            return await deleteUser(input.userId);
        }),
});
