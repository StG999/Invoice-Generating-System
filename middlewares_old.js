import jwt from 'jsonwebtoken';
const axios = require('axios').default;

// module.exports.getUser = async (cookies) => {
//     console.log("----------------------------------------------------------------------------------------------------")
//     console.log("cookies:", cookies);
//     console.log("----------------------------------------------------------------------------------------------------")

//     const token = cookies.split(';').find(cookie => cookie.trim().startsWith('token='));
//     if (!token) {
//         window.location.href = '/login';
//     }
//     const tokenValue = token.split('=')[1];

//     await axios.get('/api/auth/verify', { headers: { Authorization: `Bearer ${tokenValue}` } })
//         .then(res => {
//             console.log("res:", res);
//             return res.data.userId;
//         })
//         .catch(err => {
//             console.log("err:", err);
//             return;
//             // router.replace('/login');
//             if (err.response.status === 401) {
//                 alert('Timeout! Please login again.');
//             } else {
//                 alert('You must be logged in to access this page.');
//             }
//         });
// }

