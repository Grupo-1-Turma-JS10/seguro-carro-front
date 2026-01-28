import { BrowserRouter, Routes } from "react-router-dom"
import Footer from "./components/footer/Footer"
import Navbar from "./components/navbar/Navbar" // 1. Importe sua Navbar aqui

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar /> {/* 2. Coloque a Navbar aqui para ela fixar no topo */}
        <div className='min-h-[80vh]'> {/* 3. Dica: div para empurrar o footer para baixo */}
          <Routes>
            {/* Rotas aqui */}
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App