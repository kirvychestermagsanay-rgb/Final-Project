import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';

export default function RentVehicle() {
  const [vehicles, setVehicles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    licensePlate: '',
    dailyRate: '',
    status: 'available'
  });
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchVehicles();
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/vehicles');
      setVehicles(response.data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/vehicles/${editingId}`, formData);
        alert('Vehicle updated successfully!');
      } else {
        await axios.post('http://localhost:5000/api/vehicles', formData);
        alert('Vehicle added successfully!');
      }
      setFormData({ make: '', model: '', year: '', licensePlate: '', dailyRate: '', status: 'available' });
      setShowForm(false);
      setEditingId(null);
      fetchVehicles();
    } catch (error) {
      alert('Error saving vehicle');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (vehicle) => {
    setFormData({
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
      licensePlate: vehicle.licensePlate,
      dailyRate: vehicle.dailyRate,
      status: vehicle.status
    });
    setEditingId(vehicle.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this vehicle?')) {
      try {
        await axios.delete(`http://localhost:5000/api/vehicles/${id}`);
        alert('Vehicle deleted successfully!');
        fetchVehicles();
      } catch (error) {
        alert('Error deleting vehicle');
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ make: '', model: '', year: '', licensePlate: '', dailyRate: '', status: 'available' });
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <>
      <Head>
        <title>Manage Fleet - Vehicle Rental Manager</title>
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
              <Link href="/rent-vehicle" className="text-blue-600 hover:text-blue-800 font-bold border-b-2 border-blue-600 pb-1 transition">
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

        {/* Page Header */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-5xl font-bold mb-2">🚗 Manage Fleet</h2>
            <p className="text-lg text-blue-100">Add, edit, or delete vehicles from your inventory</p>
          </div>
        </section>

        {/* Add Button */}
        <section className="max-w-7xl mx-auto px-4 py-8 w-full">
          <button 
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition transform duration-200"
          >
            ➕ Add New Vehicle
          </button>
        </section>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full transform transition-all animate-fade-in">
              <h3 className="text-3xl font-bold mb-6 text-gray-800">{editingId ? '✏️ Edit Vehicle' : '➕ Add New Vehicle'}</h3>
              <form onSubmit={handleSubmit} key={editingId || 'new'} className="space-y-4">
                <input
                  type="text"
                  name="make"
                  placeholder="Make (e.g., Toyota)"
                  value={formData.make}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                />
                <input
                  type="text"
                  name="model"
                  placeholder="Model (e.g., Camry)"
                  value={formData.model}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                />
                <input
                  type="number"
                  name="year"
                  placeholder="Year"
                  value={formData.year}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                />
                <input
                  type="text"
                  name="licensePlate"
                  placeholder="License Plate"
                  value={formData.licensePlate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                />
                <input
                  type="number"
                  name="dailyRate"
                  placeholder="Daily Rate (₱)"
                  value={formData.dailyRate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                />
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                >
                  <option value="available">Available</option>
                  <option value="rented">Rented</option>
                  <option value="maintenance">Maintenance</option>
                </select>
                <div className="flex gap-2 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition transform hover:scale-105"
                  >
                    {loading ? '⏳ Saving...' : editingId ? '💾 Update' : '✅ Add'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 bg-gray-400 text-white py-3 rounded-lg hover:bg-gray-500 hover:shadow-lg font-semibold transition transform hover:scale-105"
                  >
                    ✕ Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Vehicles Grid */}
        <section className="max-w-7xl mx-auto px-4 py-12 flex-grow w-full">
          {vehicles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-2xl text-gray-400">🚗 No vehicles available yet.</p>
              <p className="text-gray-500 mt-2">Click "Add New Vehicle" to get started!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.map((vehicle) => (
                <div key={vehicle.id} className="p-6 bg-white border-2 border-gray-200 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition transform duration-300">
                  <div className="mb-4">
                    <h4 className="text-2xl font-bold text-gray-800">{vehicle.make}</h4>
                    <p className="text-xl text-blue-600 font-semibold">{vehicle.model}</p>
                  </div>
                  <div className="space-y-2 mb-4 bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700"><strong>📅 Year:</strong> {vehicle.year}</p>
                    <p className="text-gray-700"><strong>🔖 License:</strong> {vehicle.licensePlate}</p>
                    <p className="text-gray-700"><strong>💰 Rate:</strong> <span className="text-green-600 font-bold">₱{vehicle.dailyRate}/day</span></p>
                  </div>
                  <div className="mb-4">
                    <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${vehicle.status === 'available' ? 'bg-green-100 text-green-800' : vehicle.status === 'rented' ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'}`}>
                      {vehicle.status === 'available' ? '✓ Available' : vehicle.status === 'rented' ? '⏳ Rented' : '🔧 Maintenance'}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(vehicle)}
                      className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 hover:shadow-md font-semibold transition transform hover:scale-105"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(vehicle.id)}
                      className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 hover:shadow-md font-semibold transition transform hover:scale-105"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
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
