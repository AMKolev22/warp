import { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import GitlabProvider from 'next-auth/providers/gitlab';
 
export const authConfig : NextAuthOptions = {
  pages: {
    signIn: '/authentication/sign',
  },
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string
        }),
        GitlabProvider({
            clientId: process.env.GITLAB_ID as string,
            clientSecret: process.env.GITLAB_SECRET as string
        }),
    ],
};