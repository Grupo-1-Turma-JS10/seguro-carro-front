import { BrowserRouter, Routes } from "react-router-dom"
import Footer from "./components/footer/Footer"
import Navbar from "./components/navbar/Navbar"

function App() {
  const BASE_URL = import.meta.env.PROD ? "/seguro-carro-front" : "/";

  return (
    <>
      <BrowserRouter>
        <Navbar />
          <Routes>
            {/* Rotas aqui */}
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App;
