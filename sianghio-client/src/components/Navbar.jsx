import { NavLink, Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Articles', to: '/articles' },
];

// Existing styling for main nav links
const navLinkClassName = ({ isActive }) =>
  [
    'rounded-full border-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition',
    isActive
      ? 'border-zinc-900 bg-zinc-900 text-zinc-50'
      : 'border-transparent text-zinc-500 hover:border-zinc-900 hover:bg-zinc-50 hover:text-zinc-900',
  ].join(' ');

const NavBar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        {/* Logo Section */}
        <NavLink to="/" className="flex items-center gap-3">
          <img src={logo} alt="Centaim Logo" className="h-10 w-auto" />
          <span className="text-xl font-bold text-zinc-900 tracking-tighter">Centaim</span>
        </NavLink>

        {/* Main Navigation */}
        <nav className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={navLinkClassName}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Auth Waypoints */}
        <div className="flex items-center gap-4">
          <Link 
            to="/auth/signin" 
            className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500 hover:text-zinc-900 transition"
          >
            Log In
          </Link>
          <Link 
            to="/auth/signup" 
            className="rounded-full bg-zinc-900 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-50 transition hover:bg-zinc-700"
          >
            Sign Up
          </Link>
        </div>

      </div>
    </header>
  );
};

export default NavBar;