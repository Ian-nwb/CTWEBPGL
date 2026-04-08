import { Outlet } from 'react-router-dom';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer'; // Assuming you named the previous file Footer.jsx

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-100 text-zinc-900">
      {/* Header */}
      <NavBar />
      <main className="flex-grow pb-16 pt-20">
        <Outlet />
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;