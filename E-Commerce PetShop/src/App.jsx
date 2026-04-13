
import "./App.css"

import ItemDetailContainer from "./components/ItemDetailContanier/ItemDetailContainer.jsx"
import ItemListContainer from "./components/ItemListContainer/ItemListContainer.jsx"
import NavBar from "./components/NavBar/NavBar.jsx"

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CartProvider } from "./components/context/CartContext.jsx"

import NotFound from "./components/NotFound/NotFound.jsx"
import Cart from "./components/Cart/Cart.jsx"
import { LanguageProvider } from "./components/context/LanguageContext.jsx"
import Admin from "./components/Admin/Admin.jsx"
import Login from "./components/Login/Login.jsx"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx"
import { AuthProvider } from "./components/context/AuthContext.jsx"

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <BrowserRouter basename="/E-Commerce-Pet-Shop">
          <CartProvider>
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
                <Route path="/login" element={<Login />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <Admin />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
          </CartProvider>
        </BrowserRouter>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App
