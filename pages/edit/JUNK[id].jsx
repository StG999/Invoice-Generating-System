import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { HiOutlineTrash } from "react-icons/hi";
import axios from 'axios';

const EditInvoice = () => {
    const router = useRouter();
    const { id } = router.query;
    const [invoice, setInvoice] = useState(null);

    useEffect(() => {
        if (id) {
            const fetchInvoice = async () => {
                await axios.get('/api/fetch-bill/' + id)
                    .then(res => {
                        const fetchedInvoice = res.data.invoice;
                        console.log('Fetched invoice:', fetchedInvoice);
                        setInvoice(fetchedInvoice);
                    })
                    .catch(err => {
                        console.log('Failed to fetch invoice');
                        alert('Internal Server Error! Please try again later.');
                        router.push('/views');
                    });
            };

            fetchInvoice();
        }
    }, [router.isReady]);

    const addItem = () => {
        setItems([...items, { name: '', packaging: '', quantity: '', price: '' }]);
    };

    const removeItem = (index) => {
        const newItems = invoice.items.slice();
        newItems.splice(index, 1);
        // setItems(newItems);
        console.log('newItems:', newItems);
        setInvoice({ ...invoice, items: newItems });
        console.log('invoice:', invoice);
        calculateGrandTotal(invoice);
    }

    const handleItemChange = (index, field, value) => {
        const newItems = invoice.items.slice();
        newItems[index][field] = value;
        const newInvoice = { ...invoice, items: newItems };
        setInvoice(newInvoice);
        calculateGrandTotal(newInvoice);
    };

    const calculateGrandTotal = (invoice) => {
        const total = invoice.items.reduce((acc, item) => acc + (Number(item.quantity) * Number(item.price) || 0), 0);
        console.log('Calculating grand total...', total);
        setInvoice({ ...invoice, grandTotal: total });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        // console.log(invoice)

    };

    if (!invoice) return <div>Loading...</div>;

    return (
        <div className="p-4">
            <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-8 mx-auto">
                <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">Edit Invoice</h2>
                <form onSubmit={() => console.log('submitted!')} className="space-y-6">
                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <label className="block text-gray-700">Invoice Number</label>
                            <input type="text" value={invoice.invoiceNumber} readOnly className="w-full mt-2 p-2 border border-gray-300 rounded-md bg-gray-100" />
                        </div>
                        <div className="flex-1">
                            <label className="block text-gray-700">Date</label>
                            <input type="date" value={invoice.date} onChange={(e) => setInvoice({ ...invoice, date: e.target.value })} className="w-full mt-2 p-2 border border-gray-300 rounded-md" />
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <label className="block text-gray-700">Customer Name</label>
                            <input type="text" value={invoice.customerName} onChange={(e) => setInvoice({ ...invoice, customerName: e.target.value })} className="w-full mt-2 p-2 border border-gray-300 rounded-md" />
                        </div>
                        <div className="flex-1">
                            <label className="block text-gray-700">Customer Address</label>
                            <input type="text" value={invoice.customerAddress} onChange={(e) => setInvoice({ ...invoice, customerAddress: e.target.value })} className="w-full mt-2 p-2 border border-gray-300 rounded-md" />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-700">Items</h3>
                        {invoice.items.map((item, index) => (
                            <div key={index} className="flex space-x-4 items-center mt-4">
                                <span className="font-semibold text-gray-700">Item {index + 1}</span>
                                <div className="flex-1">
                                    <label className="block text-gray-700">Item Name</label>
                                    <input type="text" value={item.name} onChange={(e) => handleItemChange(index, 'name', e.target.value)} className="w-full mt-2 p-2 border border-gray-300 rounded-md" />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-gray-700">Packaging</label>
                                    <input type="text" value={item.packaging} onChange={(e) => handleItemChange(index, 'packaging', e.target.value)} className="w-full mt-2 p-2 border border-gray-300 rounded-md" />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-gray-700">Quantity</label>
                                    <input type="number" value={item.quantity} onChange={(e) => handleItemChange(index, 'quantity', e.target.value)} className="w-full mt-2 p-2 border border-gray-300 rounded-md" />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-gray-700">Price</label>
                                    <input type="number" value={item.price} onChange={(e) => handleItemChange(index, 'price', e.target.value)} className="w-full mt-2 p-2 border border-gray-300 rounded-md" />
                                </div>
                                <button onClick={() => removeItem(index)} className='mt-4 bg-red-500 text-white p-2 rounded-md hover:bg-red-700'>
                                    <HiOutlineTrash />
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4">
                        <label className="block text-gray-700">Grand Total: ${invoice.grandTotal.toFixed(2)}</label>
                    </div>
                    <div className="text-center mt-8">
                        <button onClick={handleSubmit} type="submit" className="bg-blue-600 text-white p-2 rounded-md w-full">Update Invoice</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditInvoice;
