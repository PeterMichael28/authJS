import { db } from "@/lib/db";

export const getTwoFactorConfirmationByUserId = async (
  userId: string
) => {
  try {
    const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique({
      where: { userId }
    });


    // console.log(twoFactorConfirmation)
    return twoFactorConfirmation;
  } catch {
    return null;
  }
};