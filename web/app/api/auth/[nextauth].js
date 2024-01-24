import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export default Options({
  providers: [
    GithubProvider({
      clientId,
      clientSecret
    }),
  ],
})