import { Link, NavLink } from "react-router-dom"
import CardWidget from "../CardWidget/CardWidget.jsx"
import { useCart } from "../context/CartContext.jsx"
import { useLanguage } from "../context/LanguageContext.jsx"
import argentinaFlag from "../../assets/img/icons8-argentina-48.png"
import brazilFlag from "../../assets/img/icons8-brasil-48.png"
import "./NavBar.css"

const NavBar = ({ title }) => {
  const { totalQuantity } = useCart()
  const { language, changeLanguage, t } = useLanguage()

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          <span className="navbar-logo-icon">🐾</span>
          <span className="navbar-logo-text">{title}</span>
        </Link>

        <nav className="navbar-links">
          <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            {t("nav_home")}
          </NavLink>
          <NavLink to="/category/food" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            {t("nav_food")}
          </NavLink>
          <NavLink to="/category/toys" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            {t("nav_toys")}
          </NavLink>
          <NavLink to="/category/grooming" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            {t("nav_grooming")}
          </NavLink>
          <NavLink to="/category/accessories" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            {t("nav_accessories")}
          </NavLink>
        </nav>

        <div className="navbar-actions">
          <div className="navbar-search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.3-4.3"/>
            </svg>
            <input type="text" placeholder={t("nav_search_placeholder")} className="navbar-search-input" />
          </div>

          <div className="navbar-language">
            <span className="lang-label">Idioma:</span>
            <button 
              className={`lang-option ${language === "es" ? "active" : ""}`}
              onClick={() => changeLanguage("es")}
              title="Español"
            >
              <img src={argentinaFlag} alt="Argentina" className="lang-icon" />
            </button>
            <button 
              className={`lang-option ${language === "pt" ? "active" : ""}`}
              onClick={() => changeLanguage("pt")}
              title="Português"
            >
              <img src={brazilFlag} alt="Brasil" className="lang-icon" />
            </button>
          </div>

          <CardWidget cartCount={totalQuantity} />
        </div>
      </div>
    </header>
  )
}

export default NavBar
