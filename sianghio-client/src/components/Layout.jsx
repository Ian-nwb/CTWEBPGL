import { Outlet } from 'react-router-dom';
import NavBar from './Navbar';

const Layout = () => {
  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900">
      <NavBar />
      <main className="pb-16 pt-20">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;