import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';

export default function ViewRentals() {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchRentals();
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  const fetchRentals = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/rentals');
      setRentals(response.data);
    } catch (error) {
      console.error('Error fetching rentals:', error);
      alert('Error loading rentals');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Rental Records - Vehicle Rental Manager</title>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='75' font-size='75'>🚗</text></svg>" />
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
        {/* Navbar */}
        <nav className="bg-white shadow-md sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">🚗 Vehicle Rental Manager</h1>
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-semibold transition">
                Dashboard
              </Link>
              <Link href="/rent-vehicle" className="text-gray-700 hover:text-blue-600 font-semibold transition">
                Manage Fleet
              </Link>
              <Link href="/view-rentals" className="text-blue-600 hover:text-blue-800 font-bold border-b-2 border-blue-600 pb-1 transition">
                Rentals
              </Link>
              <div className="flex items-center gap-4 border-l-2 border-gray-300 pl-8">
                <span className="text-gray-700 font-semibold">👤 {user?.email || 'User'}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 font-semibold transition transform hover:scale-105"
                >
                  🚪 Logout
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Page Header */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-5xl font-bold mb-2">📋 Rental Records</h2>
            <p className="text-lg text-blue-100">Monitor all active rentals and customer details</p>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-7xl mx-auto px-4 py-12 flex-grow w-full">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin text-blue-600 text-4xl">⏳</div>
              <p className="text-gray-600 mt-4">Loading rentals...</p>
            </div>
          ) : rentals.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-2xl text-gray-400">📭 No rental records found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border-2 border-gray-200">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-bold">👤 Customer</th>
                    <th className="px-6 py-4 text-left font-bold">📧 Email</th>
                    <th className="px-6 py-4 text-left font-bold">📱 Phone</th>
                    <th className="px-6 py-4 text-left font-bold">🚗 Vehicle</th>
                    <th className="px-6 py-4 text-left font-bold">📅 Start Date</th>
                    <th className="px-6 py-4 text-left font-bold">📅 End Date</th>
                    <th className="px-6 py-4 text-left font-bold">💵 Total Cost</th>
                    <th className="px-6 py-4 text-left font-bold">📊 Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-gray-200">
                  {rentals.map((rental, index) => (
                    <tr key={rental.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition`}>
                      <td className="px-6 py-4 text-gray-800 font-semibold">{rental.name}</td>
                      <td className="px-6 py-4 text-gray-600">{rental.email}</td>
                      <td className="px-6 py-4 text-gray-600">{rental.phone}</td>
                      <td className="px-6 py-4 text-gray-800 font-bold text-blue-600">{rental.make} {rental.model}</td>
                      <td className="px-6 py-4 text-gray-600">{new Date(rental.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                      <td className="px-6 py-4 text-gray-600">{new Date(rental.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                      <td className="px-6 py-4 text-gray-800 font-bold text-green-600">₱{rental.totalCost.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className={`px-4 py-2 rounded-full text-sm font-bold inline-block ${rental.status === 'active' ? 'bg-green-100 text-green-800' : rental.status === 'completed' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                          {rental.status === 'active' ? '✓ Active' : rental.status === 'completed' ? '✔ Completed' : '●' + rental.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-white text-center py-8 border-t-4 border-blue-600">
          <p className="font-bold text-lg">&copy; 2024 Vehicle Rental Manager. All rights reserved.</p>
          <p className="text-gray-400 mt-2">Professional fleet management solution</p>
        </footer>
      </div>
    </>
  );
}
