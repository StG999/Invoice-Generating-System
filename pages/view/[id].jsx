import Navbar from "../../components/navbar"
import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import axios from "axios";
import LoadingAnimation from "../../components/loading-animation";

export default function View() {
    const router = useRouter();
    let invoiceId = router.query.id;
    const [invoice, setInvoice] = useState({ invoiceNumber: '', date: '', customerName: '', customerAddress: '', items: [], grandTotal: 0 });

    const editInvoice = async () => {
        router.push(`/edit/${invoiceId}`);
    }

    const deleteInvoice = async () => {
        await axios.delete(`/api/delete-bill/${invoiceId}`)
            .then(res => {
                if (res.status === 200) {
                    router.push('/views');
                    alert(`Invoice ${invoiceId} deleted successfully!`);
                }
                if (res.status === 404) {
                    alert('Invoice not found!');
                }
            })
            .catch(err => {
                alert('Internal Server Error! Please try again later.');
                router.push('/views');
            });
    }

    useEffect(() => {
        if (!router.isReady) return;
        invoiceId = router.query.id;
        const fetchInvoice = async () => {
            await axios.get(`/api/fetch-bill/${invoiceId}`)
                .then(res => {
                    if (res.status === 200) {
                        setInvoice(res.data.invoice);
                    }
                })
                .catch(err => {
                    alert('Internal Server Error! Please try again later.');
                    router.push('/views');
                });
        }
        fetchInvoice();
    }, [router.isReady, invoice.invoiceId]);

    return (
        <div>
            <Navbar />
            <div>
                {invoice ? (
                    <div className="flex justify-center items-center min-h-screen p-4">
                        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-8">
                            <div className="flex justify-end space-x-4 mb-4">
                                <button type="button" onClick={deleteInvoice} className="bg-red-600 text-white p-2 rounded-md hover:bg-red-500">Delete Invoice</button>
                                <button type="button" onClick={editInvoice} className="bg-yellow-400 text-black p-2 rounded-md hover:bg-yellow-300">Edit Invoice</button>
                            </div>
                            <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">Maa Sumat Yadav Store</h2>
                            <div className="space-y-6">
                                <div className="flex justify-between">
                                    <div>
                                        <h3 className="font-semibold text-gray-700">Invoice Number:</h3>
                                        <p>{invoice.invoiceNumber}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-700">Date:</h3>
                                        <p>{invoice.date}</p>
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <div>
                                        <h3 className="font-semibold text-gray-700">Customer Name:</h3>
                                        <p>{invoice.customerName}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-700">Customer Address:</h3>
                                        <p>{invoice.customerAddress}</p>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-700">Items:</h3>
                                    <table className="w-full table-auto border-collapse border border-gray-300 mt-4">
                                        <thead>
                                            <tr className="bg-gray-100">
                                                <th className="border border-gray-300 p-2">Item #</th>
                                                <th className="border border-gray-300 p-2">Item Name</th>
                                                <th className="border border-gray-300 p-2">Packaging</th>
                                                <th className="border border-gray-300 p-2">Quantity</th>
                                                <th className="border border-gray-300 p-2">Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {invoice.items.map((item, index) => (
                                                <tr key={index} className="text-center">
                                                    <td className="border border-gray-300 p-2">{index + 1}</td>
                                                    <td className="border border-gray-300 p-2">{item.name}</td>
                                                    <td className="border border-gray-300 p-2">{item.packaging}</td>
                                                    <td className="border border-gray-300 p-2">{item.quantity}</td>
                                                    <td className="border border-gray-300 p-2">&#8377;{item.price}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="mt-4">
                                    <h3 className="font-semibold text-gray-700">Grand Total:</h3>
                                    <p className="font-semibold">INR {invoice.grandTotal.toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="text-center mt-8">
                                <button className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-md">Print Invoice</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center items-center min-h-screen p-4">
                        <LoadingAnimation />
                    </div>
                )}
            </div>
        </div>
    )
}