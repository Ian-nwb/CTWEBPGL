import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const SignInPage = () => {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900">Welcome back</h1>
        <p className="mt-3 text-zinc-600">
          Sign in to access your Centaim workspace
        </p>
      </div>

      <form className="space-y-6">
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
            placeholder="••••••••"
            autoComplete="current-password"
            className="mt-2 w-full rounded-2xl border border-zinc-300 bg-white px-5 py-3.5 text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 outline-none transition"
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-zinc-600 cursor-pointer">
            <input 
              type="checkbox" 
              className="h-4 w-4 rounded border-zinc-300 accent-black" 
            />
            <span>Remember me</span>
          </label>
          <Link to="/auth/forgot-password" className="font-medium text-zinc-700 hover:text-zinc-900 transition">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" variant="primary" className="w-full py-3.5 text-base font-medium">
          Sign In
        </Button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase tracking-widest text-zinc-400">
            <span className="bg-white px-4">or continue with</span>
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
        Don't have an account?{' '}
        <Link to="/auth/signup" className="font-semibold text-zinc-900 hover:text-black transition">
          Sign up free
        </Link>
      </p>
    </>
  );
};

export default SignInPage;