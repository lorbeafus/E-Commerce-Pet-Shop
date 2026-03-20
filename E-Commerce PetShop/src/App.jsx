
import "./App.css"

import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer.jsx"
import ItemListContainer from "./components/ItemListContainer/ItemListContainer.jsx"
import NavBar from "./components/NavBar/NavBar.jsx"


import {BrowserRouter, Route, Routes} from 'react-router-dom'


import NotFound from "./components/NotFound/NotFound.jsx"

function App() {
  const cartCount = 5

  return (
    <BrowserRouter>
      <div className="app">
        <NavBar
          cartCount={cartCount}
          title="Tienda Coder"
        />
        <main className="app-content">
          <Routes>
            <Route path="/" element={<ItemListContainer />} />
            <Route path="/category/:categoryId" element={<ItemListContainer />} />
            <Route path="/detail/:productId" element={<ItemDetailContainer />}/>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App
