import NextAuth, { DefaultSession } from "next-auth"
import GitHub from "next-auth/providers/github"

// adds username to the session type so typescript doesnt complain
declare module "next-auth" {
    interface Session {
        user: { username?: string } & DefaultSession["user"]
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [GitHub],
    callbacks: {
        // github calls it "login" so we save it to the token here
        async jwt({ token, profile }: any) {
            if (profile) token.username = profile.login
            return token
        },
        async session({ session, token }: any) {
            session.user.username = token.username
            return session
        }
    }
})
