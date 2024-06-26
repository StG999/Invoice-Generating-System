import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' })
    }
    const invoiceId = req.query.id;
    const client = await clientPromise;
    const db = client.db('MSYS');
    const collection = db.collection('bills');
    try {
        const invoice = await collection.findOne({ invoiceNumber: invoiceId });
        console.log('FETCH-BILL API(RESPONSE):', invoice);
        res.status(200).json({ invoice });
    } catch (err) {
        console.log('FETCH-BILL API(ERROR):', err);
        return res.status(500).json({ message: 'Failed to fetch invoice' });
    }

};