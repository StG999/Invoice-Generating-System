import clientPromise from '../../lib/mongodb';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }
    console.log(req.body);
    if (!userId || !password) {
        return res.status(400).json({ message: 'Missing userId or password' });
    }
    const client = await clientPromise;
    const usersCollection = client.db().collection('users');


    res.status(200).json({ message: 'Hello from Next.js!' })
}
