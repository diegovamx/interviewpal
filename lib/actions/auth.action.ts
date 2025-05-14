"use server";

import { db, auth } from "@/firebase/admin";
import { cookies } from "next/headers";

const WEEK = 60 * 60 * 24 * 7; // 7 days

export async function signUp(params: SignUpParams) {
  const { uid, name, email } = params;

  try {
    const userRecord = await db.collection("users").doc(uid).get();
    if (userRecord.exists) {
      return {
        success: false,
        message: "User already exists. Please sign in.",
      };
    }
    await db.collection("users").doc(uid).set({
      name,
      email,
    });
    return {
      success: true,
      message: "User signed up successfully. Please sign in.",
    }
  } catch (e: any) {
    console.error("Error signing up user:", e);

    if (e.code === "auth/email-already-exists") {
      return {
        success: false,
        message: "Email already exists",
      };
    }
    return {
      success: false,
      message: "Error signing up user",
    };
  }
}

export async function signIn(params: SignInParams) {
  const { email, idToken } = params;
  try {
    const userRecord = await auth.getUserByEmail(email);
    if (!userRecord) {
      return {
        success: false,
        message: "User does not exist. Please sign up.",
      };
    }
    await setSessionCookie(idToken);
  } catch (error) {
    console.error("Error signing in user:", error);
    return {
      success: false,
      message: "Error signing in user",
    };
  }
}

export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies();

  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: WEEK * 1000, // 7 days
  });

  cookieStore.set("session", sessionCookie, {
    maxAge: WEEK * 1000, // 7 days
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
}

export async function getCurrentUser() : Promise<User | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;

  if (!sessionCookie) {
    return null;
  }

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
    const userRecord = await db.collection("users").doc(decodedClaims.uid).get();

    if (!userRecord.exists) {
      return null;
    }

    return {
      ... userRecord.data(),
      id: userRecord.id,

    } as User;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

export async function isAuthenticated() {
  const user = await getCurrentUser();
  
  return !!user;
}