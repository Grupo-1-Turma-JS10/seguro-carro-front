import Footer from "./components/footer/Footer"
import Navbar from "./components/navbar/Navbar"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ListaVeiculos } from "./pages/segurados/ListaVeiculos"
import { VeiculoForm } from "./pages/segurados/VeiculoForm"
import Home from "./pages/home/Home"
import Seguros from "./pages/seguros/Seguros"
import ScrollNoTopo from "./utils/ScrollNoTopo"

function App() {
  const BASE_URL =  "/seguro-carro-front";

  return (
    <>
      <BrowserRouter basename={BASE_URL}>
      <ScrollNoTopo />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/seguros" element={<Seguros />} />
          <Route path="/segurados" element={<ListaVeiculos />} />
          <Route path="/segurados/novo" element={<VeiculoForm />} />
          <Route path="/segurados/editar/:id" element={<VeiculoForm />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App;
