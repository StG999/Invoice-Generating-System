// Configuration

import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '../../../lib/mongodb';

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
                const usersCollection = client.db().collection('users');
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
