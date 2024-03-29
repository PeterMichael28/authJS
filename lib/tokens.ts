
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

import { db } from "@/lib/db";
import {getTwoFactorTokenByEmail} from '../services/two-factor-token-service'
import { getPasswordResetTokenByEmail } from "@/services/password-reset-token-service";
import { getVerificationTokenByEmail } from "@/services/verification-token-service";

export const generateTwoFactorToken = async (email: string) => {

 
  // get a random number between 100,000 and 1,000,000
  const token = crypto.randomInt(100_000, 1_000_000).toString();

  // expires after a minute
  const expires = new Date(new Date().getTime() + 5 * 60 * 1_000);

  const existingToken = await getTwoFactorTokenByEmail(email);

  if (existingToken) {
    await db.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      }
    });
  }

  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    }
  });

  return twoFactorToken;
}

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: { id: existingToken.id }
    });
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires
    }
  });

  return passwordResetToken;
}

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verficationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    }
  });

  return verficationToken;
};