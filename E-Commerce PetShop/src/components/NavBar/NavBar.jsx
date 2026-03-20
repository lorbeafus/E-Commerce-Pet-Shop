import { Link, NavLink } from "react-router-dom"
import CardWidget from "../CardWidget/CardWidget.jsx"
import "./NavBar.css"

const NavBar = ({ cartCount, title }) => {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          <span className="navbar-logo-icon">🐾</span>
          <span className="navbar-logo-text">{title}</span>
        </Link>

        <nav className="navbar-links">
          <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Home
          </NavLink>
          <NavLink to="/category/food" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Food & Treats
          </NavLink>
          <NavLink to="/category/toys" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Toys
          </NavLink>
          <NavLink to="/category/grooming" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Grooming
          </NavLink>
          <NavLink to="/category/accessories" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Accessories
          </NavLink>
        </nav>

        <div className="navbar-actions">
          <div className="navbar-search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.3-4.3"/>
            </svg>
            <input type="text" placeholder="Search products..." className="navbar-search-input" />
          </div>
          <CardWidget cartCount={cartCount} />
        </div>
      </div>
    </header>
  )
}

export default NavBar
