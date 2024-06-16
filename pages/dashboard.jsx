import { useEffect, useState } from 'react';
import cookies from 'js-cookie';
import Navbar from '../components/navbar';
import axios from 'axios';

export default function Dashboard(req, res) {
  const [userId, setUserId] = useState('');
  useEffect(() => {
    setUserId(cookies.get('userId'));
  }, [userId]);

  const callPython = async () => {
    // const response = await fetch('http://localhost:5000/generateBill');
    // const data = await response.json();
    const params = {
      'invoiceNumber': '005',
      'date': "2003-07-30",
      'customerName': 'Siddhant Yadav',
      'customerAddress': 'Delhi',
      'items': [
        {
          'name': 'Item 1',
          'packaging': '100gm',
          'quantity': 2,
          'rate': 69
        },
        {
          'name': 'Item 2',
          'packaging': '1pc',
          'quantity': 3,
          'rate': 99
        },
        {
          'name': 'Item 3',
          'packaging': '10pc',
          'quantity': 2,
          'rate': 26
        }
      ],
      'grandTotal': 487,
    }
    axios.post('http://localhost:5000/generateBill', params)
      .then((response) => {
        console.log('pythonAPI RESPONSE: ', response)
      })
      .catch((error) => {
        console.log('pythonAPI ERROR: ', error)
      });
  }

  return (
    <div>
      <Navbar />
      <div className="grid">
        <a href="/create-invoice" className="card">
          <h3>New Bill &rarr;</h3>
          <p>Create a new invoice for your organization.</p>
        </a>

        <a href="/views" className="card">
          <h3>View Bills &rarr;</h3>
          <p>View all past bills in the name of your organization.</p>
        </a>
        <button onClick={callPython}>
          PYTHON
        </button>
      </div>

      <style jsx>{`
        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
          margin: auto;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition:
            color 0.15s ease,
            border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            Fira Sans,
            Droid Sans,
            Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}