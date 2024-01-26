import GithubProvider from 'next-auth/providers/github'
 
export const authConfig = {
  pages: {
    signIn: '/authentication/sign',
  },
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
    ],
};