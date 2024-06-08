import { useState } from 'react';
import Navbar from '../components/navbar';

export default function CreateInvoice() {
    const [items, setItems] = useState([{ name: '', packaging: '', quantity: '', price: '' }]);
    const [grandTotal, setGrandTotal] = useState(0);

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
        console.log(items)
        // handle form submission logic here
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
                            <input required type="date" className="w-full mt-2 p-2 border border-gray-300 rounded-md" />
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
                                <button onClick={() => removeItem(index)}
                                    class="relative mt-auto align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs bg-red-500 text-white shadow-md shadow-red-500/20 hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                                    type="button"
                                >
                                    <span
                                        class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                                    ><i class="fas fa-heart" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                        </i
                                        ></span></button
                                >
                            </div>
                        ))}
                        <button type="button" onClick={addItem} className="mt-4 bg-blue-600 text-white p-2 rounded-md">Add Another Item</button>
                    </div>
                    <div>
                        <label className="block font-semibold text-gray-700">Grand Total: INR {grandTotal.toFixed(2)}</label>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="bg-blue-600 text-white p-2 rounded-md w-full">Create Bill</button>
                    </div>
                </form>
            </div>
            {/* <!-- from node_modules --> */}
            <script src="node_modules/@material-tailwind/html@latest/scripts/ripple.js"></script>

            {/* <!-- from cdn --> */}
            <script src="https://unpkg.com/@material-tailwind/html@latest/scripts/ripple.js"></script>
        </div>
    );
};