import Footer from "./components/footer/Footer"
import Navbar from "./components/navbar/Navbar"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Segurados } from "./pages/segurados/Segurados"
import { VeiculoForm } from "./pages/segurados/VeiculoForm"
import Home from "./pages/home/Home"

function App() {
  const BASE_URL = "/seguro-carro-front";

  return (
    <>
      <BrowserRouter basename={BASE_URL}>
        <Navbar />
        <Routes>
          {/* Rotas aqui */}
          <Route path="/" element={<Home />} />
          <Route path="/segurados" element={<Segurados />} />
          <Route path="/segurados/novo" element={<VeiculoForm />} />
          <Route path="/segurados/editar/:id" element={<VeiculoForm />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App;
