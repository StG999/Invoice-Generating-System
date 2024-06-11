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
    try {
        const usersCollection = client.db('MSYS').collection('users');

        const existingUser = await usersCollection.findOne({ userId });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await usersCollection.insertOne({ userId, password: hashedPassword });
        console.log("REGISTER API (RESPONSE):", result);
        return res.status(201).json({ message: 'User registered successfully', hashedPassword });
    } catch (err) {
        console.log("REGISTER API (ERROR):", err);
        return res.status(500).json({ message: 'Failed to register user' });
    }
}
