"use server"

import { cookies } from "next/headers"
import { signIn, signOut } from "@/auth"

// clears auth cookies so refreshing the page signs the user out
export async function clearSession() {
    const cookieStore = await cookies()
    cookieStore.delete("authjs.session-token")
    cookieStore.delete("__Secure-authjs.session-token")
}

export async function handleSignIn() {
    await signIn("github")
}

export async function handleSignOut() {
    await signOut()
}
