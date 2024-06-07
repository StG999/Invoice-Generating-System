import Head from 'next/head';
const { useState } = require('react');
const axios = require('axios').default;
const { useRouter } = require('next/router');
import cookies from 'js-cookie';

export default function Login() {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.post('/api/auth/login', { userId, password })
            .then(res => {
                document.cookie = `token=${res.data.token}; path=/`;
                cookies.set('userId', userId, { expires: 1 });

                router.push('/dashboard')
            })
            .catch(err => {
                if (err.response.status === 401) {
                    alert('Invalid credentials')
                } else {
                    alert('Failed to login. Try again later.')
                }
            })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Head>
                <title>Login</title>
            </Head>
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
                <form onSubmit={handleSubmit}>
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
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    )
}