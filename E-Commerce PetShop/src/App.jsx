
import "./App.css"

import ItemDetailContainer from "./components/ItemDetailContanier/ItemDetailContainer.jsx"
import ItemListContainer from "./components/ItemListContainer/ItemListContainer.jsx"
import NavBar from "./components/NavBar/NavBar.jsx"

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import NotFound from "./components/NotFound/NotFound.jsx"
import Cart from "./components/Cart/Cart.jsx"
import { LanguageProvider } from "./components/context/LanguageContext.jsx"
import Admin from "./components/Admin/Admin.jsx"

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter basename="/E-Commerce-Pet-Shop">
        <div className="app">
          <NavBar
            title="Pet Shop"
          />
          <main className="app-content">
            <Routes>
              <Route path="/" element={<ItemListContainer />} />
              <Route path="/category/:categoryId" element={<ItemListContainer />} />
              <Route path="/detail/:productId" element={<ItemDetailContainer />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App
