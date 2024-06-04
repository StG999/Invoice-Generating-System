import clientPromise from '../../../lib/mongodb';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }
    const { userId, password } = req.body;
    if (!userId || !password) {
        return res.status(400).json({ message: 'Missing userId or password' });
    }
    const client = await clientPromise;
    const usersCollection = client.db('MSYS').collection('users');

    const existingUser = await usersCollection.findOne({ userId });
    if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await usersCollection.insertOne({ userId, password: hashedPassword });
    return res.status(201).json({ message: 'User registered successfully', hashedPassword });
}
