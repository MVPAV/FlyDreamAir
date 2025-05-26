import {publicProcedure, router} from '../trpc';
import {z} from "zod";
import {updateUserProfile} from "src/server/db/user";

export const userRouter = router({
    updateProfile: publicProcedure
        .input(z.object({
            firstName: z.string().optional(),
            lastName: z.string().optional(),
            phoneNumber: z.string().optional(),
            dateOfBirth: z.string().optional(), // ISO string
            emergencyName: z.string().optional(),
            emergencyPhone: z.string().optional(),
            emergencyRelationship: z.string().optional(),
        }))
        .mutation(async ({ctx, input}) => {
            const userId = ctx.session?.user.id;
            if (userId) {
                return updateUserProfile(userId, input);
            }
        }),
});
