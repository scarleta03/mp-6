import NextAuth, { DefaultSession } from "next-auth"
import GitHub from "next-auth/providers/github"

// tells typescript that the session user has a username field
declare module "next-auth" {
    interface Session {
        user: { username?: string } & DefaultSession["user"]
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [GitHub],
    callbacks: {
        // runs when the jwt token is created — we grab the github username here
        // github stores the username under "login" not "username"
        async jwt({ token, profile }: any) {
            if (profile) token.username = profile.login
            return token
        },
        // runs whenever the session is checked — copies username from token to session
        async session({ session, token }: any) {
            session.user.username = token.username
            return session
        }
    }
})
