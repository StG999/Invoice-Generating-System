import { useEffect, useState } from 'react';
import { NextRequest } from 'next/server';
import cookies from 'js-cookie';
import Navbar from '../components/navbar';

export default function Dashboard(req, res) {
    const [userId, setUserId] = useState('');
    useEffect(() => {
        setUserId(cookies.get('userId'));

    });

    return (
        <div>
            <Navbar />
            <h1>Dashboard</h1>
            <h2>Welcome {userId}</h2>
        </div>
    )
}