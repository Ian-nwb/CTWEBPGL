import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '../../components/Button';
import axios from 'axios';
import constants from '../../../constants';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    age: '',
    gender: '',
    contactNumber: '',
    address: ''
  });

  // Simplified handler: Ensure the input 'name' matches the state key
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${constants.HOST}/users/register`, formData);
      const { token, firstName, role } = response.data;

      localStorage.setItem('user', JSON.stringify({ firstName, role, token }));

      // Redirect based on role
      if (role === 'viewer') {
        navigate('/articles');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Validation failed. Please fill all fields.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900">Create your account</h1>
        <p className="mt-3 text-zinc-600">Start managing your business smarter with Centaim</p>
      </div>

      {error && (
        <div className="mb-6 rounded-2xl bg-red-50 p-4 text-sm text-red-600 border border-red-100">
          {error}
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Name Group */}
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="text-sm font-medium text-zinc-700">First name</label>
            <input 
              name="firstName" type="text" required value={formData.firstName} onChange={handleChange} placeholder="Juan"
              className="mt-2 w-full rounded-2xl border border-zinc-300 bg-white px-5 py-3 text-zinc-900 outline-none focus:ring-1 focus:ring-zinc-900 transition"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-zinc-700">Last name</label>
            <input 
              name="lastName" type="text" required value={formData.lastName} onChange={handleChange} placeholder="Dela Cruz"
              className="mt-2 w-full rounded-2xl border border-zinc-300 bg-white px-5 py-3 text-zinc-900 outline-none focus:ring-1 focus:ring-zinc-900 transition"
            />
          </div>
        </div>

        {/* Username & Contact Group */}
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="text-sm font-medium text-zinc-700">Username</label>
            <input 
              name="username" type="text" required value={formData.username} onChange={handleChange} placeholder="juandelacruz"
              className="mt-2 w-full rounded-2xl border border-zinc-300 bg-white px-5 py-3 text-zinc-900 outline-none focus:ring-1 focus:ring-zinc-900 transition"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-zinc-700">Contact Number</label>
            <input 
              name="contactNumber" type="text" required value={formData.contactNumber} onChange={handleChange} placeholder="09123456789"
              className="mt-2 w-full rounded-2xl border border-zinc-300 bg-white px-5 py-3 text-zinc-900 outline-none focus:ring-1 focus:ring-zinc-900 transition"
            />
          </div>
        </div>

        {/* Age & Gender Group */}
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="text-sm font-medium text-zinc-700">Age</label>
            <input 
              name="age" type="number" required value={formData.age} onChange={handleChange} placeholder="25"
              className="mt-2 w-full rounded-2xl border border-zinc-300 bg-white px-5 py-3 text-zinc-900 outline-none focus:ring-1 focus:ring-zinc-900 transition"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-zinc-700">Gender</label>
            <select 
              name="gender" required value={formData.gender} onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-zinc-300 bg-white px-5 py-3 text-zinc-900 outline-none focus:ring-1 focus:ring-zinc-900 transition appearance-none"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-zinc-700">Address</label>
          <input 
            name="address" type="text" required value={formData.address} onChange={handleChange} placeholder="Quezon City, Metro Manila"
            className="mt-2 w-full rounded-2xl border border-zinc-300 bg-white px-5 py-3 text-zinc-900 outline-none focus:ring-1 focus:ring-zinc-900 transition"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-zinc-700">Email address</label>
          <input 
            name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="you@company.com"
            className="mt-2 w-full rounded-2xl border border-zinc-300 bg-white px-5 py-3 text-zinc-900 outline-none focus:ring-1 focus:ring-zinc-900 transition"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-zinc-700">Password</label>
          <input 
            name="password" type="password" required minLength={8} value={formData.password} onChange={handleChange} placeholder="••••••••"
            className="mt-2 w-full rounded-2xl border border-zinc-300 bg-white px-5 py-3 text-zinc-900 outline-none focus:ring-1 focus:ring-zinc-900 transition"
          />
        </div>

        <Button type="submit" variant="primary" className="w-full py-3.5 text-base font-medium" disabled={isLoading}>
          {isLoading ? 'Creating account...' : 'Create Free Account'}
        </Button>

        {/* Social Placeholders */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-zinc-200" /></div>
          <div className="relative flex justify-center text-xs uppercase tracking-widest text-zinc-400"><span className="bg-white px-4">or sign up with</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button type="button" variant="secondary" className="py-3 text-sm font-medium">Google</Button>
          <Button type="button" variant="secondary" className="py-3 text-sm font-medium">Apple</Button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm text-zinc-600">
        Already have an account?{' '}
        <Link to="/auth/signin" className="font-semibold text-zinc-900 hover:text-black transition">Sign in</Link>
      </p>
    </>
  );
};

export default SignUpPage;