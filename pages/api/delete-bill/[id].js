import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
    const invoiceId = req.query.id;
    if (req.method !== 'DELETE') {
        return res.status(405).json({ message: 'Method not allowed' })
    }
    console.log("DELETE-BILL API (INVOICE ID):", invoiceId);
    const client = await clientPromise;
    const collection = client.db('MSYS').collection('bills');
    try {
        const result = await collection.deleteOne({ invoiceNumber: invoiceId });
        if (result.deletedCount === 1) {
            console.log("DELETE-BILL API (RESULT):", result);
            return res.status(200).json({ message: 'Bill deleted successfully.' });
        } else {
            return res.status(404).json({ message: 'No documents matched given ID.' });
        }
    } catch (err) {
        console.log("DELETE-BILL API (ERROR):", err);
        return res.status(500).json({ message: 'Internal Server Error! Please try again later.' });
    }
}