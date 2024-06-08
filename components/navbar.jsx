// components/Navbar.js
import Link from 'next/link';
import cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Navbar = () => {
    const [userId, setUserId] = useState('');
    useEffect(() => {
        setUserId(cookies.get('userId'));
    });

    const router = useRouter();
    const handleLogout = () => {
        cookies.remove('token');
        cookies.remove('userId');
        router.push('/login');
    };

    return (
        <nav className="bg-blue-600 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-lg font-bold">
                    Welcome {userId}!
                </div>
                <div className="flex space-x-4">
                    <Link className="text-white hover:text-blue-200" href="/dashboard">
                        Dashboard
                    </Link>
                    <Link className="text-white hover:text-blue-200" href="/create-invoice">
                        New Bill
                    </Link>
                    <Link className="text-white hover:text-blue-200" href="/views">
                        View Bills
                    </Link>
                    <button className="text-red-200 hover:text-red-400" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
