import { useState } from 'react';
import Navbar from '../components/navbar';
import axios from 'axios';
import { useRouter } from 'next/router';
import { HiOutlineTrash, HiPlus } from "react-icons/hi";


export default function CreateInvoice() {
    const router = useRouter();
    const [items, setItems] = useState([{ name: '', packaging: '', quantity: '', price: '' }]);
    const [grandTotal, setGrandTotal] = useState(0);
    let defaultDate = new Date()

    const [date, setDate] = useState(defaultDate)

    const onSetDate = (event) => {
        setDate(new Date(event.target.value))
    }

    const addItem = () => {
        setItems([...items, { name: '', packaging: '', quantity: '', price: '' }]);
    };

    const removeItem = (index) => {
        const newItems = items.slice();
        newItems.splice(index, 1);
        setItems(newItems);
        calculateGrandTotal(newItems);
    }

    const handleItemChange = (index, field, value) => {
        const newItems = items.slice();
        newItems[index][field] = value;
        setItems(newItems);
        calculateGrandTotal(newItems);
    };

    const calculateGrandTotal = (items) => {
        const total = items.reduce((acc, item) => acc + (Number(item.quantity) * Number(item.price) || 0), 0);
        setGrandTotal(total);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            invoiceNumber: e.target[0].value,
            date: e.target[1].value,
            customerName: e.target[2].value,
            customerAddress: e.target[3].value,
            items: items,
            grandTotal: grandTotal
        }
        console.log(data)
        axios.post('/api/create-bill', data)
            .then(res => {
                if (res.status === 201) {
                    router.push('/view/' + data.invoiceNumber);
                }
            })
            .catch(err => {
                alert('Internal Server Error! Please try again later.');
            });
    };

    return (
        <div>
            <Navbar />
            <div className="flex justify-center items-center min-h-screen p-4">
                <form onSubmit={handleSubmit} className="w-full max-w-4xl bg-white shadow-md rounded-lg p-8 space-y-6">
                    <h2 className="text-2xl font-semibold text-center text-blue-600">Create Invoice</h2>
                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <label className="block text-gray-700">Invoice Number</label>
                            <input required type="text" className="w-full mt-2 p-2 border border-gray-300 rounded-md" />
                        </div>
                        <div className="flex-1">
                            <label className="block text-gray-700">Date</label>
                            <input value={date.toLocaleDateString('en-CA')} onChange={onSetDate} required type="date" className="w-full mt-2 p-2 border border-gray-300 rounded-md" />
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <div className="flex-2">
                            <label className="block text-gray-700">Customer Name</label>
                            <input required type="text" className="w-full mt-2 p-2 border border-gray-300 rounded-md" />
                        </div>
                        <div className="flex-1">
                            <label className="block text-gray-700">Customer Address</label>
                            <input type="text" className="w-full mt-2 p-2 border border-gray-300 rounded-md" />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-700">Items</h3>
                        {items.map((item, index) => (
                            <div key={index} className="flex space-x-4 items-center mt-4">
                                {/* <span className="font-semibold text-gray-700">Item {index + 1}</span> */}
                                <div className="flex-1">
                                    <label className="block text-gray-700">Item Name</label>
                                    <input required type="text" value={item.name} onChange={(e) => handleItemChange(index, 'name', e.target.value)} className="w-full mt-2 p-2 border border-gray-300 rounded-md" />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-gray-700">Packaging</label>
                                    <input required type="text" value={item.packaging} onChange={(e) => handleItemChange(index, 'packaging', e.target.value)} className="w-full mt-2 p-2 border border-gray-300 rounded-md" />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-gray-700">Quantity</label>
                                    <input required type="number" value={item.quantity} onChange={(e) => handleItemChange(index, 'quantity', e.target.value)} className="w-full mt-2 p-2 border border-gray-300 rounded-md" />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-gray-700">Price</label>
                                    <input required type="number" value={item.price} onChange={(e) => handleItemChange(index, 'price', e.target.value)} className="w-full mt-2 p-2 border border-gray-300 rounded-md" />
                                </div>
                                <button type='button' onClick={() => removeItem(index)} className='mt-4 bg-red-500 text-white p-2 rounded-md hover:bg-red-700'>
                                    <HiOutlineTrash className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                        <div className="text-center mt-4">
                            <button type="button" onClick={addItem} className="bg-green-600 text-white p-2 rounded-md">
                                <HiPlus className="w-5 h-5 inline" /> Add Item
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block font-semibold text-gray-700">Grand Total: INR {grandTotal.toFixed(2)}</label>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-700">Create Bill</button>
                    </div>
                </form>
            </div>
        </div>
    );
};