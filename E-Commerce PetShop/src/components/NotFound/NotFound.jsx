import { Link } from "react-router-dom"
import { useLanguage } from "../context/LanguageContext.jsx"
import "./NotFound.css"

const NotFound = () => {
  const { t } = useLanguage()

  return (
    <div className="not-found-page">
      <span className="not-found-emoji">🐾</span>
      <h1 className="not-found-title">404</h1>
      <h2 className="not-found-subtitle">{t("not_found_subtitle")}</h2>
      <p className="not-found-text">
        {t("not_found_text")}
      </p>
      <Link to="/" className="not-found-btn">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
        {t("not_found_btn")}
      </Link>
    </div>
  )
}

export default NotFound
