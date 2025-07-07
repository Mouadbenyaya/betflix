import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css";

import { Settings, User, Menu, X, LayoutDashboard, FileText, Search, Home as HomeIcon } from 'lucide-react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(() => {
    try {
      const storedValue = localStorage.getItem("sidebar-open");
      return storedValue !== null ? JSON.parse(storedValue) : true;
    } catch (error) {
      console.error("Failed to read 'sidebar-open' from localStorage:", error);
      return true;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("sidebar-open", JSON.stringify(isOpen));
    } catch (error) {
      console.error("Failed to write 'sidebar-open' to localStorage:", error);
    }
  }, [isOpen]);

  return (
    <>
      <button
        className="sidebar-toggle-btn"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
        title={isOpen ? "Close navigation menu" : "Open navigation menu"}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <div className="sidebar-header-spacer"></div>
        <nav>
          <ul>
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) => isActive ? "active-link" : undefined}
              >
                <HomeIcon size={18} />
                <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/search"
                className={({ isActive }) => isActive ? "active-link" : undefined}
              >
                <Search size={18} />
                <span>Rechercher</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/settings"
                className={({ isActive }) => isActive ? "active-link" : undefined}
              >
                <Settings size={18} />
                <span>Settings</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/profile"
                className={({ isActive }) => isActive ? "active-link" : undefined}
              >
                <User size={18} />
                <span>Profile</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/sections"
                className={({ isActive }) => isActive ? "active-link" : undefined}
              >
                <LayoutDashboard size={18} />
                <span>Sections</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/reports"
                className={({ isActive }) => isActive ? "active-link" : undefined}
              >
                <FileText size={18} />
                <span>Reports</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}
