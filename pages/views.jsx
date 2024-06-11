import Navbar from "../components/navbar"
import { useEffect, useState } from "react"
import axios from "axios";
import { HiEye } from 'react-icons/hi';
import { useRouter } from 'next/router';


export default function Views() {
    const [bills, setBills] = useState([]);
    const router = useRouter();
    useEffect(() => {
        const fetchBills = async () => {
            await axios.get('/api/fetch-bills')
                .then(res => {
                    console.log(res.data.bills);
                    setBills(res.data.bills);
                })
                .catch(err => {
                    console.log(err);
                });
        }
        fetchBills();
    }, []);

    const viewBill = (invoiceNumber) => {
        router.push(`/view/${invoiceNumber}`);
    }

    return (
        <div>
            <Navbar />
            <div className="p-4">
                <div className="w-full max-w-6xl mx-auto">
                    <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">All Bills</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {bills.map((bill, index) => (
                            <div key={index} className="bg-white shadow-md rounded-lg p-4">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-700">Invoice: {bill.invoiceNumber}</h3>
                                        <p className="text-gray-600">Customer: {bill.customerName}</p>
                                        <p className="text-gray-600">Date: {bill.date}</p>
                                        <p className="text-gray-600">Total: ${bill.grandTotal.toFixed(2)}</p>
                                    </div>
                                    <button onClick={() => viewBill(bill.invoiceNumber)} className="bg-green-600 hover:bg-green-500 text-white p-2 rounded-md">
                                        <HiEye className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}