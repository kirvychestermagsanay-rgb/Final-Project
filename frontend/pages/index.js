import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <>
      <Head>
        <title>Dashboard - Vehicle Rental Manager</title>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='75' font-size='75'>🚗</text></svg>" />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
        {/* Navbar */}
        <nav className="bg-white shadow-md sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">🚗 Vehicle Rental Manager</h1>
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-blue-600 hover:text-blue-800 font-bold border-b-2 border-blue-600 pb-1 transition">
                Dashboard
              </Link>
              <Link href="/rent-vehicle" className="text-gray-700 hover:text-blue-600 font-semibold transition">
                Manage Fleet
              </Link>
              <Link href="/view-rentals" className="text-gray-700 hover:text-blue-600 font-semibold transition">
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

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-2">Welcome to Your Dashboard</h2>
            <p className="text-lg text-blue-100">Manage your vehicle rental business efficiently</p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="max-w-7xl mx-auto px-4 py-12 w-full">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-blue-600 hover:shadow-lg transition">
              <div className="text-4xl font-bold text-blue-600">6</div>
              <p className="text-gray-600 mt-2 font-semibold">Total Vehicles</p>
              <p className="text-sm text-gray-500 mt-1">In your fleet</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-green-600 hover:shadow-lg transition">
              <div className="text-4xl font-bold text-green-600">4</div>
              <p className="text-gray-600 mt-2 font-semibold">Available Now</p>
              <p className="text-sm text-gray-500 mt-1">Ready for rental</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-orange-600 hover:shadow-lg transition">
              <div className="text-4xl font-bold text-orange-600">5</div>
              <p className="text-gray-600 mt-2 font-semibold">Active Rentals</p>
              <p className="text-sm text-gray-500 mt-1">Currently rented</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-purple-600 hover:shadow-lg transition">
              <div className="text-4xl font-bold text-purple-600">₱45,500</div>
              <p className="text-gray-600 mt-2 font-semibold">Revenue</p>
              <p className="text-sm text-gray-500 mt-1">This month</p>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="max-w-7xl mx-auto px-4 py-12 w-full">
          <h3 className="text-3xl font-bold text-gray-800 mb-8">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link 
              href="/rent-vehicle"
              className="bg-white p-8 rounded-xl shadow-md border-2 border-gray-200 hover:border-blue-600 hover:shadow-lg transition group"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition">🚗</div>
              <h4 className="text-2xl font-bold text-gray-800 mb-2">Manage Fleet</h4>
              <p className="text-gray-600">Add, edit, or remove vehicles from your inventory</p>
              <div className="mt-4 text-blue-600 font-semibold">Get Started →</div>
            </Link>

            <Link 
              href="/view-rentals"
              className="bg-white p-8 rounded-xl shadow-md border-2 border-gray-200 hover:border-blue-600 hover:shadow-lg transition group"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition">📋</div>
              <h4 className="text-2xl font-bold text-gray-800 mb-2">View Rentals</h4>
              <p className="text-gray-600">Monitor all active rentals and customer details</p>
              <div className="mt-4 text-blue-600 font-semibold">View Now →</div>
            </Link>

            <div className="bg-white p-8 rounded-xl shadow-md border-2 border-gray-200 hover:border-blue-600 hover:shadow-lg transition group cursor-pointer">
              <div className="text-5xl mb-4 group-hover:scale-110 transition">📊</div>
              <h4 className="text-2xl font-bold text-gray-800 mb-2">Reports</h4>
              <p className="text-gray-600">View analytics and business reports</p>
              <div className="mt-4 text-blue-600 font-semibold">Coming Soon →</div>
            </div>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="max-w-7xl mx-auto px-4 py-12 w-full">
          <h3 className="text-3xl font-bold text-gray-800 mb-8">Recent Activity</h3>
          <div className="bg-white rounded-xl shadow-md border-2 border-gray-200 overflow-hidden">
            <div className="p-6 border-b-2 border-gray-200 hover:bg-gray-50 transition">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-gray-800">New rental booked</p>
                  <p className="text-sm text-gray-600">Maria Santos rented a Toyota Camry</p>
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full font-bold">Today</span>
              </div>
            </div>
            <div className="p-6 border-b-2 border-gray-200 hover:bg-gray-50 transition">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-gray-800">Vehicle added</p>
                  <p className="text-sm text-gray-600">BMW 320i (License: JKL-3456) added to fleet</p>
                </div>
                <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-bold">Yesterday</span>
              </div>
            </div>
            <div className="p-6 hover:bg-gray-50 transition">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-gray-800">Rental completed</p>
                  <p className="text-sm text-gray-600">John Doe returned Ford Mustang - ₱10,500 earned</p>
                </div>
                <span className="text-xs bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-bold">2 days ago</span>
              </div>
            </div>
          </div>
        </section>

        {/* Business Overview */}
        <section className="max-w-7xl mx-auto px-4 py-12 w-full">
          <h3 className="text-3xl font-bold text-gray-800 mb-8">Business Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl border-2 border-blue-200">
              <h4 className="text-2xl font-bold text-gray-800 mb-4">📈 Fleet Status</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-semibold">Available Vehicles</span>
                  <span className="text-lg font-bold text-green-600">4/6</span>
                </div>
                <div className="w-full bg-gray-300 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{width: '66%'}}></div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-gray-700 font-semibold">Rented Vehicles</span>
                  <span className="text-lg font-bold text-orange-600">1/6</span>
                </div>
                <div className="w-full bg-gray-300 rounded-full h-2">
                  <div className="bg-orange-600 h-2 rounded-full" style={{width: '17%'}}></div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-gray-700 font-semibold">In Maintenance</span>
                  <span className="text-lg font-bold text-red-600">1/6</span>
                </div>
                <div className="w-full bg-gray-300 rounded-full h-2">
                  <div className="bg-red-600 h-2 rounded-full" style={{width: '17%'}}></div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-xl border-2 border-purple-200">
              <h4 className="text-2xl font-bold text-gray-800 mb-4">💼 Business Performance</h4>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-700 font-semibold mb-1">Monthly Revenue</p>
                  <p className="text-3xl font-bold text-purple-600">₱45,500</p>
                </div>
                <div>
                  <p className="text-gray-700 font-semibold mb-1">Average Daily Rate</p>
                  <p className="text-2xl font-bold text-blue-600">₱2,425</p>
                </div>
                <div>
                  <p className="text-gray-700 font-semibold mb-1">Occupancy Rate</p>
                  <p className="text-2xl font-bold text-green-600">83%</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-white text-center py-8 mt-auto border-t-4 border-blue-600">
          <p className="font-bold text-lg">&copy; 2024 Vehicle Rental Manager. All rights reserved.</p>
          <p className="text-gray-400 mt-2">Professional fleet management solution</p>
        </footer>
      </div>
    </>
  );
}
