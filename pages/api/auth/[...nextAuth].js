// Configuration
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '../../../lib/db';

export default NextAuth({
    providers: [
        Providers.Credentials({
            name: 'Credentials',
            credentials: {
                userId: { label: 'User ID', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            authorize: async (credentials) => {
                const client = await clientPromise;
                const usersCollection = client.db('MSYS').collection('users');
                const user = await usersCollection.findOne({ userId: credentials.userId });

                if (user && user.password === credentials.password) {
                    return user;
                } else {
                    return null;
                }
            }
        })
    ],
    adapter: MongoDBAdapter(clientPromise),
    secret: process.env.NEXTAUTH_SECRET
});
