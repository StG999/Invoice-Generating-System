// components/Navbar.js
import Link from 'next/link';
import cookies from 'js-cookie';

const Navbar = () => {
    const userId = cookies.get('userId');
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
                    <Link className="text-white hover:text-blue-200" href="/about">
                        New Bill
                    </Link>
                    <Link className="text-white hover:text-blue-200" href="/contact">
                        View Bills
                    </Link>
                    <Link className="text-red-200 hover:text-red-400" href="/contact">
                        Logout
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
