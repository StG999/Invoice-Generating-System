import { useEffect, useState } from 'react';
import cookies from 'js-cookie';
import Navbar from '../components/navbar';

export default function Dashboard(req, res) {
  const [userId, setUserId] = useState('');
  useEffect(() => {
    setUserId(cookies.get('userId'));
  }, [userId]);

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