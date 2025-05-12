"use server";

import { db } from "@/firebase/admin";

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
      email
    });
  } catch (e:any) {
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
