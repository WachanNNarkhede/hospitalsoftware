import React from 'react';

interface NavLink {
  name: string;
  route: string;
}

interface HeaderProps {
  links: NavLink[];
}

const Header: React.FC<HeaderProps> = ({ links }) => {
  return (
    <header className="bg-blue-600 text-white p-5">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Hospital Name</h1>
        <nav className="space-x-6">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.route}
              className="hover:text-green-300 bg-emerald-500/70 p-2 rounded-md"
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
