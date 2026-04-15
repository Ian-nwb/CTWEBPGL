import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const SignUpPage = () => {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900">Create your account</h1>
        <p className="mt-3 text-zinc-600">
          Start managing your business smarter with Centaim
        </p>
      </div>

      <form className="space-y-6">
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label htmlFor="first-name" className="text-sm font-medium text-zinc-700">
              First name
            </label>
            <input 
              id="first-name"
              type="text"
              placeholder="Juan"
              autoComplete="given-name"
              className="mt-2 w-full rounded-2xl border border-zinc-300 bg-white px-5 py-3.5 text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 outline-none transition"
            />
          </div>
          <div>
            <label htmlFor="last-name" className="text-sm font-medium text-zinc-700">
              Last name
            </label>
            <input 
              id="last-name"
              type="text"
              placeholder="Dela Cruz"
              autoComplete="family-name"
              className="mt-2 w-full rounded-2xl border border-zinc-300 bg-white px-5 py-3.5 text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 outline-none transition"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-medium text-zinc-700">
            Email address
          </label>
          <input 
            id="email"
            type="email"
            placeholder="you@company.com"
            autoComplete="email"
            className="mt-2 w-full rounded-2xl border border-zinc-300 bg-white px-5 py-3.5 text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 outline-none transition"
          />
        </div>

        <div>
          <label htmlFor="password" className="text-sm font-medium text-zinc-700">
            Password
          </label>
          <input 
            id="password"
            type="password"
            placeholder="Create a strong password"
            autoComplete="new-password"
            className="mt-2 w-full rounded-2xl border border-zinc-300 bg-white px-5 py-3.5 text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 outline-none transition"
          />
          <p className="mt-2 text-xs text-zinc-500">
            Must be at least 8 characters with letters, numbers, and symbols
          </p>
        </div>

        <Button type="submit" variant="primary" className="w-full py-3.5 text-base font-medium">
          Create Free Account
        </Button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase tracking-widest text-zinc-400">
            <span className="bg-white px-4">or sign up with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button type="button" variant="secondary" className="py-3 text-sm font-medium">
            Google
          </Button>
          <Button type="button" variant="secondary" className="py-3 text-sm font-medium">
            Apple
          </Button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm text-zinc-600">
        Already have an account?{' '}
        <Link to="/auth/signin" className="font-semibold text-zinc-900 hover:text-black transition">
          Sign in
        </Link>
      </p>
    </>
  );
};

export default SignUpPage;