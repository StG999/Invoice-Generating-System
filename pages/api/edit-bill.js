import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const invoice = req.body;
    delete invoice['_id'];
    const client = await clientPromise;
    const collection = client.db('MSYS').collection('bills');
    try {
        const result = await collection.updateOne({ invoiceNumber: invoice.invoiceNumber }, { $set: invoice }, { upsert: false }); // (filer, update, options)
        console.log("EDIT-BILL API (RESULT):", result);
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Invoice not found' });
        }
        res.status(200).json({ message: 'Invoice updated successfully' });
    } catch (err) {
        console.log("EDIT-BILL API (ERROR):", err);
        return res.status(500).json({ message: 'Internal Server Error! Please try again later.' });
    }
}