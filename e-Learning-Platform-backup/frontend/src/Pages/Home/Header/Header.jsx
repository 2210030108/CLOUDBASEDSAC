import { NavLink } from 'react-router-dom';
import Logo from '../../Images/logo.svg';
import { toast } from 'react-hot-toast';

const navLinks = [
  { name: 'Home', to: '/' },
  { name: 'Courses', to: '/courses' },
  { name: 'About', to: '/about' },
  { name: 'Contact Us', to: '/contact' },
];

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
        {/* Logo Section */}
        <NavLink to="/">
          <div className="flex items-center gap-3 cursor-pointer">
            <img src={Logo} alt="logo" className="h-10 w-10" />
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#4E84C1] via-[#00B4DB] to-[#4E84C1]">
              Adhyayan Kendra
            </h1>
          </div>
        </NavLink>

        {/* Navigation Links */}
        <ul className="hidden md:flex gap-10 text-black text-lg font-medium">
          {navLinks.map((link, index) => (
            <li key={index}>
              <NavLink 
                to={link.to} 
                className={({ isActive }) => 
                  isActive 
                    ? 'border-b-2 border-[#4E84C1] pb-1 text-[#4E84C1]' 
                    : 'hover:text-[#4E84C1]'
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Auth Buttons */}
        <div className="flex gap-4">
          <NavLink to="/login">
            <button 
              className="px-5 py-2 rounded-md border border-[#4E84C1] text-[#4E84C1] hover:bg-[#4E84C1] hover:text-white"
              onClick={() => toast('Redirecting to Login...', { icon: '🔐' })}
            >
              Login
            </button>
          </NavLink>
          <NavLink to="/signup">
            <button 
              className="px-5 py-2 rounded-md bg-[#4E84C1] text-white hover:bg-[#3a6ca5]"
              onClick={() => toast.success('Let’s get you signed up!')}
            >
              Signup
            </button>
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default Header;
