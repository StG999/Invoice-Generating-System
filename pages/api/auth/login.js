// const clientPromise = require('../../lib/mongodb');  // Because the file is not using module.exports rather is normally exporting.
import clientPromise from '../../../lib/mongodb';          // therefore we use import instead of require
const bcrypt = require('bcrypt');
import { serialize } from 'cookie';
const jwt = require('jsonwebtoken');

export default async function handler(req, res) {
    const { userId, password } = req.body;
    if (!userId || !password) {
        return res.status(400).json({ message: 'Missing userId or password' });
    }
    const client = await clientPromise;
    const users = client.db('MSYS').collection('users');
    const user = await users.findOne({ userId });
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '1m'
    });
    return res.status(200).json({ token, message: 'Login successful' });
}