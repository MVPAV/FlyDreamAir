import {publicProcedure, router} from '../trpc';
import {z} from "zod";
import {getUserBookings, updateUserProfile} from "src/server/db/users";

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

    getUserBookingss: publicProcedure
        .query(async ({input, ctx}) => {
            const userId = ctx.session?.user?.id;
            if (!userId) throw new Error("Unauthorized");

            return getUserBookings(userId);
        }),
});
