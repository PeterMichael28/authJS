
"use server";

import * as z from "zod";
import { AuthError } from "next-auth";

import { db } from "@/lib/db";
import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { 
  sendVerificationEmail,
  sendTwoFactorTokenEmail,
} from "@/lib/mail";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { 
  generateVerificationToken,
  generateTwoFactorToken
} from "@/lib/tokens";
import { getUserByEmail } from "@/services/user-service";
import { getTwoFactorTokenByEmail } from "@/services/two-factor-token-service";
import { getTwoFactorConfirmationByUserId } from "@/services/two-factor-confirmation-service";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null,
) => {
  // Validate the input data
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  // getting data
  const { email, password, code } = validatedFields.data;

  // if user exists
  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" }
  }
 
  // check if email is  not verified and if  not, send a new email
  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email,
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return { success: "Confirmation email sent!" };
    }
    
 
    // if user activated the 2factor settings
  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(
        existingUser.email
      );


      if (!twoFactorToken) {
        return { error: "Invalid code!" };
      }


      if (twoFactorToken.token !== code) {
        return { error: "Invalid code!" };
      }


      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        return { error: "Code expired!" };
      }

      // delet the old token
      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id }
      });


      // confirm token
      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id }
        });
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        }
      });
    } else {
 
      // send new token
      const twoFactorToken = await generateTwoFactorToken(existingUser.email)
      await sendTwoFactorTokenEmail(
        twoFactorToken.email,
        twoFactorToken.token,
      );

      return { twoFactor: true };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" }
        default:
          return { error: "Something went wrong!" }
      }
    }

    throw error;
  }
};