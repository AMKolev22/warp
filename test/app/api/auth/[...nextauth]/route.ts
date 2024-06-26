import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import { authConfig } from '../../../../auth.config'


export const handler = NextAuth(authConfig)

export { handler as GET, handler as POST }