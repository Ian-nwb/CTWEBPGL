import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo.png';

const footerLinks = [
  {
    title: 'Product',
    links: [
      { label: 'Home', to: '/' },
      { label: 'Articles', to: '/articles' },
      { label: 'About', to: '/about' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Privacy Policy', to: '/privacy' },
      { label: 'Terms of Service', to: '/terms' },
      { label: 'Contact', to: '/contact' },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <NavLink to="/" className="flex items-center gap-3">
              <img src={logo} alt="Centaim Logo" className="h-8 w-auto" />
              <span className="text-xl font-bold tracking-tighter text-zinc-900">
                Centaim
              </span>
            </NavLink>
            <p className="mt-4 max-w-xs text-sm leading-6 text-zinc-600">
              Empowering your digital journey with insights and innovation. 
              Built for the modern web.
            </p>
          </div>

          {/* Link Columns */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-2">
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-900">
                  {section.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {section.links.map((link) => (
                    <li key={link.to}>
                      <NavLink
                        to={link.to}
                        className="text-sm text-zinc-500 transition hover:text-zinc-900"
                      >
                        {link.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-zinc-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-zinc-400">
            © {new Date().getFullYear()} Centaim Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-xs text-zinc-400 hover:text-zinc-900 cursor-pointer transition">LinkedIn</span>
            <span className="text-xs text-zinc-400 hover:text-zinc-900 cursor-pointer transition">GitHub</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;