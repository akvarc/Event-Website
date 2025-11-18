import { NavLink, Form, useRouteLoaderData } from "react-router-dom";
import { useState } from "react";
import NewsletterSignup from "./NewsletterSignup";

function MainNavigation() {
  const token = useRouteLoaderData("root");
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <header className="w-full bg-neutral-900 text-white shadow-lg border-b border-neutral-800 relative z-50">
      <nav className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">

        {/* Logo */}
        <h1 className="text-xl font-bold text-[#ffe600]">EVENTS</h1>

        {/* Hamburger Button */}
        <button 
          className="md:hidden flex flex-col gap-[6px]" 
          onClick={() => setOpen(!open)}
        >
          <span className={`block w-7 h-[3px] bg-[#ffe600] transition ${open ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`block w-7 h-[3px] bg-[#ffe600] transition ${open ? "opacity-0" : ""}`}></span>
          <span className={`block w-7 h-[3px] bg-[#ffe600] transition ${open ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-10 text-lg">
          <li><NavLink to="/" end className={({ isActive }) => isActive ? "text-[#ffe600]" : "hover:text-[#ffe600] transition"}>Home</NavLink></li>
          <li><NavLink to="/events" className={({ isActive }) => isActive ? "text-[#ffe600]" : "hover:text-[#ffe600] transition"}>Events</NavLink></li>
          <li><NavLink to="/newsletter" className={({ isActive }) => isActive ? "text-[#ffe600]" : "hover:text-[#ffe600] transition"}>Newsletter</NavLink></li>

          {!token && (
            <li><NavLink to="/auth?mode=login" className={({ isActive }) => isActive ? "text-[#ffe600]" : "hover:text-[#ffe600] transition"}>Authentication</NavLink></li>
          )}

          {token && (
            <li>
              <Form action="/logout" method="post">
                <button className="hover:text-red-400 transition">Logout</button>
              </Form>
            </li>
          )}
        </ul>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-neutral-900 border-t border-neutral-700 transition-all duration-300 overflow-hidden z-50 ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col items-center py-4 space-y-6 text-lg">

          <li><NavLink to="/" onClick={closeMenu} end className={({ isActive }) => isActive ? "text-[#ffe600]" : "hover:text-[#ffe600] transition"}>Home</NavLink></li>

          <li><NavLink to="/events" onClick={closeMenu} className={({ isActive }) => isActive ? "text-[#ffe600]" : "hover:text-[#ffe600] transition"}>Events</NavLink></li>

          <li><NavLink to="/newsletter" onClick={closeMenu} className={({ isActive }) => isActive ? "text-[#ffe600]" : "hover:text-[#ffe600] transition"}>Newsletter</NavLink></li>

          {!token && (
            <li><NavLink to="/auth?mode=login" onClick={closeMenu} className={({ isActive }) => isActive ? "text-[#ffe600]" : "hover:text-[#ffe600] transition"}>Authentication</NavLink></li>
          )}

          {token && (
            <li>
              <Form action="/logout" method="post">
                <button onClick={closeMenu} className="hover:text-red-400 transition">Logout</button>
              </Form>
            </li>
          )}

          {/* Newsletter under menu */}
          {/* <div className="w-full px-6">
            <NewsletterSignup />
          </div> */}
        </ul>
      </div>
    </header>
  );
}

export default MainNavigation;
