// pages/register.js
import Head from 'next/head';
import { useState } from 'react';
const axios = require('axios').default;
const { useRouter } = require('next/router');

export default function Register() {

    const [userId, setUserId] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter();

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(userId, password);
        await axios.post('/api/register', { userId, password })
            .then(res => {
                if (res.status === 201) {
                    router.push('/api/auth/signin');
                }
            })
            .catch(err => {
                if (err.response.status === 409) {
                    alert('User already exists')
                } else {
                    alert('Failed to register user')
                }
            });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Head>
                <title>User Registration</title>
            </Head>
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label htmlFor="userId" className="block text-gray-700 mb-2">
                            User ID
                        </label>
                        <input
                            type="text"
                            id="userId"
                            name="userId"
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            onChange={(e) => setUserId(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    )
};

