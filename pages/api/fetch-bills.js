import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' })
    }
    const client = await clientPromise;
    const db = client.db('MSYS');
    const collection = db.collection('bills');
    try {
        const bills = await collection.find({}).toArray();
        console.log("FETCH-BILL API (RESULT):", bills);
        res.status(200).json({ bills });
    } catch {
        res.status(500).json({ message: 'Internal Server Error! Please try again later.' });
    }
};