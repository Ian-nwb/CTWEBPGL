import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '../../components/Button';
import { loginUser } from '../../services/userService';

const SignInPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

const handleLogin = async (e) => {
  e.preventDefault();
  setError('');
  setIsLoading(true);

  try {
    const response = await loginUser(formData);
    const { token, firstName, type } = response.data;

    // ENHANCEMENT: Block viewers from entering the workspace
    if (type === "viewer") {
      setError("Viewers are not permitted to access the dashboard.");
      setIsLoading(false);
      return; // Stop here, do not save to localStorage
    }

    const userData = { firstName, type, token };
    localStorage.setItem('user', JSON.stringify(userData));

    navigate('/dashboard', { state: userData });
  } catch (err) {
    const message = err.response?.data?.message || 'Invalid credentials.';
    setError(message);
  } finally {
    setIsLoading(false);
  }
};
  return (
    <>
      <div className="mb-8">
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900">Welcome back</h1>
        <p className="mt-3 text-zinc-600">Sign in to access your Centaim workspace</p>
      </div>

      {error && (
        <div className="mb-4 rounded-2xl bg-red-50 p-4 text-sm text-red-600 animate-in fade-in duration-300">
          {error}
        </div>
      )}

      <form className="space-y-6" onSubmit={handleLogin}>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-zinc-700">Email address</label>
          <input 
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@company.com"
            required
            disabled={isLoading}
            className="mt-2 w-full rounded-2xl border border-zinc-300 bg-white px-5 py-3.5 text-zinc-900 outline-none focus:ring-1 focus:ring-zinc-900 transition disabled:opacity-50"
          />
        </div>

        <div>
          <label htmlFor="password" className="text-sm font-medium text-zinc-700">Password</label>
          <input 
            id="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
            disabled={isLoading}
            className="mt-2 w-full rounded-2xl border border-zinc-300 bg-white px-5 py-3.5 text-zinc-900 outline-none focus:ring-1 focus:ring-zinc-900 transition disabled:opacity-50"
          />
        </div>

        <Button type="submit" variant="primary" className="w-full py-3.5" disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>

      <p className="mt-10 text-center text-sm text-zinc-600">
        Don't have an account? <Link to="/auth/signup" className="font-semibold text-zinc-900">Sign up free</Link>
      </p>
    </>
  );
};

export default SignInPage;