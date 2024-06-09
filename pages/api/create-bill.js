import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }
    console.log(req.body)
    const data = req.body;
    const client = await clientPromise;
    const billsCollection = client.db('MSYS').collection('bills');

    try {
        await billsCollection.insertOne(data);
        return res.status(201).json({ message: 'Bill created successfully' });
    } catch (err) {
        return res.status(500).json({ message: 'Failed to create bill' });
    }
}